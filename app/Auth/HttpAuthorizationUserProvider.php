<?php namespace App\Auth;

use App\Models\Claim;
use App\Models\User;
use Doctrine\Common\Persistence\ObjectManager as DB;
use Illuminate\Http\Request;
use Psr\Log\LoggerInterface as Log;

class HttpAuthorizationUserProvider implements UserProvider
{
    /**
     * The current HTTP request
     *
     * @var Request
     */
    private $request;

    /**
     * The current request's logger
     * 
     * @var Psr\Log\LoggerInterface
     */
    private $log;

    /**
     * The database
     * @var Doctrine\Common\Persistence\ObjectManager
     */
    private $db;

    /**
     * The current user
     * 
     * @var App\Models\User
     */
    private $currentUser = null;

    /**
     * Whether the authorization header has been parsed
     * 
     * @var boolean
     */
    private $hasAuthorizationHeaderBeenParsed = false;

    public function __construct(Request $request, Log $log, DB $db)
    {
        $this->request = $request;
        $this->log = $log;
        $this->db = $db;
    }

    public function getCurrentUser()
    {
        if (!$this->hasAuthorizationHeaderBeenParsed) {
            $this->log->info('Attempting Id token authorization');
      
            $authorization = $request->header('Authorization');
            if ($authorization !== null) {
                $this->log->info(
                    'Authorization header is present',
                    ['header' => $authorization]);
                 
                $authInfo = explode(' ', $authorization);
                if ((count($authInfo) === 2) && ($authInfo[0] === 'Bearer')) {
                    $jwt = $authInfo[1];

                    $this->log->info('Attempting Google authentication');

                    $googleJwtAuth = new GoogleJwtAuthorization();
                    $claims = $googleJwtAuth->getClaims($jwt);
                    if (isset($claims['iss']) && isset($claims['sub'])) {
                        $this->log->info('Google claims found');
                        $claim = $this->db->getRepository('Claim')
                            ->findByIssuerAndSubject(
                                $claims['iss'],
                                $claims['sub']);
                        if (!isset($claim)) {
                            $this->log->info('Claim not found in database, persisting');
                            $claim = new Claim($claims['iss'], $claims['sub']);
                            $this->db->persist($claim);
                        }

                        if (isset($claim)) {
                            $this->currentUser = $claim->user();
                            if (!isset($this->currentUser)) {
                                $this->currentUser = new User();
                                $this->db->persist($this->currentUser);

                                $claim->setUser($this->currentUser);
                            }
                        }

                        $this->db->flush();
                    }
                }
            }
        }

        return $this->currentUser;
    }
}
