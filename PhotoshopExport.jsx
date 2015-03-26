function savePNG(doc, qty) {  
	
    var docName 				= doc.name;
    var docPath               	= doc.path;

    var autoSavePath            = docPath + '/';
    var autoSaveFolder          = new Folder( autoSavePath );
    if( !autoSaveFolder.exists ) {
 	    autoSaveFolder.create(); 
 	}

    var currentAS               = autoSaveFolder.getFiles( docName + '*' + 'png' );
    var suffix                  = currentAS.length + 1;
    
    var saveName 				= new File(decodeURI(doc.path)+'/'+docName[1]+suffix+'.jpg');
	// docName 	              	= docName.substring( 0, docName.indexOf('.') );
	docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];

	var png_Opt					= new PNGSaveOptions();  
    png_Opt.embedColorProfile = true;  
    png_Opt.transparency = true;
    png_Opt.quality = qty;   
    doc.saveAs( saveName, saveOptions, true );  
}  


function savePSD(doc) {

    var docName               = doc.name;
    var docPath               = doc.path;
    docName 	              = docName.substring( 0, docName.indexOf('.') );

    var autoSavePath          = docPath + '/' + "PSDs" + ' (AutoSave)';
    var autoSaveFolder        = new Folder( autoSavePath );
    if( !autoSaveFolder.exists ) {
 	    autoSaveFolder.create(); 
 	}
    var currentAS             = autoSaveFolder.getFiles( docName + '*' + 'psd' );
    var suffix                = currentAS.length + 1;

    var saveName 			  = new  File( autoSavePath + '/' + docName + '_rev_' + suffix + 'psd' );
    var psd_Opt               = new PhotoshopSaveOptions();
    psd_Opt.layers            = true; // Preserve layers.
    psd_Opt.embedColorProfile = true; // Preserve color profile.
    psd_Opt.annotations       = true; // Preserve annonations.
    psd_Opt.alphaChannels     = true; // Preserve alpha channels.
    psd_Opt.spotColors        = true; // Preserve spot colors.

    // Save active document in the Auto Save folder
    doc.saveAs(saveName , psd_Opt, true );
}


var doc = app.activeDocument;
savePNG(app.activeDocument, 100);
savePSD(doc);
app.beep();