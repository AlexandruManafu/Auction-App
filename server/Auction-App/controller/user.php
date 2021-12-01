<?php
require_once('model/user.php');
require_once('cache/cache_manipulation.php');

function register($username, $password) {
    $user = new User($username, $password);

    if (!$user->exists())
        $user->saveUser();
    else echo "userul exista deja";
}

function login($username, $password) {
    $user = new User($username, $password);
    
    if($user->verifyUser()) {
        logInToCache('logged_users.json', array('username' => $username, 'ip' => $_SERVER['REMOTE_ADDR']));
    }
    else {
        echo "Wrong data, mother-ducker";
    }
}

function logout() {
    logOutFromCache('logged_users.json', $_SERVER['REMOTE_ADDR']);
}

function isLogged() {
    if (entry_exists('logged_users.json', $_SERVER['REMOTE_ADDR']))
        echo 'yes';
    else echo 'no';
}
