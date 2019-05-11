<?php
 $hashes = "";
 
 // Create the Arrays for each category
 $network = array("\n\nNETWORK:");
 $cache = array("\n\nCACHE:");
 $ignore = array("error_log","x");
 
 $dir = new RecursiveDirectoryIterator(".");
 
 foreach(new RecursiveIteratorIterator($dir) as $file) {
  if ($file->IsFile() && $file != "./manifest.php" && substr($file->getFilename(), 0, 1) != ".") {
   if(preg_match('/.php$/', $file)) {
    foreach($ignore as $item):
     if(strpos($file, $item)): $allow = FALSE; break; else: $allow = TRUE; endif;
    endforeach;
    if($allow): array_push($network,"\n" . $file); endif;
   } else {
    foreach($ignore as $item):
     if(strpos($file, $item)): $allow = FALSE; break; else: $allow = TRUE; endif;
    endforeach;
    if($allow): array_push($cache,"\n" . $file); endif;
   }
   $hashes .= md5_file($file);
  }
 }
 
 $fh = fopen('offline.manifest', 'w');
 fwrite($fh,'CACHE MANIFEST');
 
 foreach($cache as $file): fwrite($fh,$file); endforeach;
 foreach($network as $file): fwrite($fh,$file);	endforeach;
 fwrite($fh,"\nhSpecific Entry");
 fwrite($fh, "\n\n# Hash:" . md5($hashes)); 
 fclose($fh);
?>