<?php

use Symfony\Component\Debug\Debug;
use Symfony\Component\HttpFoundation\Request;

// If you don't want to setup permissions the proper way, just uncomment the following PHP line
// read https://symfony.com/doc/current/setup.html#checking-symfony-application-configuration-and-setup
// for more information
//umask(0000);

// This check prevents access to debug front controllers that are deployed by accident to production servers.
// Feel free to remove this, extend it, or make something more sophisticated.
$accept = false;

// acceptAdminUser's DDNS read
$fpath = __DIR__.'/../app/dev_admin_ddns';
$fp = fopen($fpath, 'r+');
$fqdns = fread($fp, filesize($fpath));
$adminHostArray = explode("\n", $fqdns);
foreach ($adminHostArray as $adminHost) {
    $host = gethostbynamel($adminHost);
    if ($host) {
        if (in_array($_SERVER['REMOTE_ADDR'], $host)) {
            $accept = true;
        }
    }
}

if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1', '210.171.168.115', '192.168.33.1', '110.233.45.26', '60.109.172.188', '210.194.168.114'), true) || PHP_SAPI === 'cli-server')
) {
    if (!$accept) {
        header('HTTP/1.0 403 Forbidden');
        exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
    }
}

require __DIR__.'/../app/autoload.php';
include_once __DIR__.'/../app/secure.php';
Debug::enable();

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
