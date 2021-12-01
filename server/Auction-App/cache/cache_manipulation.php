<?php 

$folder_name = dirname(__FILE__).'\\'.'json';

function add_entry($json_file, $entry) {
    global $folder_name;
    
    $str = file_get_contents($folder_name.'\\'.$json_file);
    $json = json_decode($str, true);
    if(!entry_exists($json_file, $entry['ip']))
        $json[] = $entry;
        $newJsonString = json_encode($json);
        file_put_contents($folder_name.'\\'.$json_file, $newJsonString);
}

function entry_exists($json_file, $ip) {
    global $folder_name;
    $str = file_get_contents($folder_name.'\\'.$json_file);
    $json = json_decode($str, true);

    if (is_null($json) || count($json) == 0)
        return FALSE;

    foreach ($json as $entry) {
        if ($entry['ip'] == $ip)
            return TRUE;
    }
    return FALSE;
}

function logInToCache($json_file, $entry) {
    global $folder_name;

    $str = file_get_contents($folder_name.'\\'.$json_file);
    $json = json_decode($str, true);
    
    if (count($json) == 0)
        add_entry($json_file, $entry);

    else {
        if (!entry_exists($json_file, $entry['ip'])) {
            $json[] = $entry;
            $newJsonString = json_encode($json);
            file_put_contents($folder_name.'\\'.$json_file, $newJsonString);
        }
        else echo "to do";
    }
    return FALSE;
}

function logOutFromCache($json_file, $ip) {
    global $folder_name;

    $str = file_get_contents($folder_name.'\\'.$json_file);
    $json = json_decode($str, true);

    $newJson = array();
    foreach ($json as $entry) {
        if ($entry['ip'] != $ip)
            $newJson[] = $entry;
    }
    $newJsonString = json_encode($newJson);
    file_put_contents($folder_name.'\\'.$json_file, $newJsonString);
    
    return FALSE;
}