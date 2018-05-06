<?php
//$target_filename = $__siteDir.'/data/'.md5(time()).'.'.$ext;

if (isset($_FILES['img_input']) && $_FILES['img_input']) {
    $namear = explode('.', $_FILES['img_input']['name']);
    $ext = end($namear);
    $dst_filename = $__siteDir.'/data/'.md5(time()).'.'.$ext;

    if (in_array($ext, array('png', 'jpg', 'jpeg', 'gif'))) {
        $maxDimW = 800;
        $maxDimH = 600;
        list($width, $height, $type, $attr) = getimagesize( $_FILES['img_input']['tmp_name'] );
        if ( $width > $maxDimW || $height > $maxDimH ) {
            $target_filename = $_FILES['img_input']['tmp_name'];
            $fn = $_FILES['img_input']['tmp_name'];
            $size = getimagesize( $fn );
            $ratio = $size[0]/$size[1]; // width/height
            if( $ratio > 1) {
                $width = $maxDimW;
                $height = $maxDimH/$ratio;
            } else {
                $width = $maxDimW*$ratio;
                $height = $maxDimH;
            }
            $src = imagecreatefromstring(file_get_contents($fn));
            $dst = imagecreatetruecolor( $width, $height );
            imagecopyresampled($dst, $src, 0, 0, 0, 0, $width, $height, $size[0], $size[1] );

            imagejpeg($dst, $target_filename); // adjust format as needed
        }

        move_uploaded_file($_FILES['img_input']['tmp_name'], $dst_filename);
        echo json_encode(array('status' => 'success', 'data' => $dst_filename));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Not image.'));
    }
} else {
    echo json_encode(array('status' => 'error', 'message' => 'No input found.'));
}