import React from 'react'
import pdf from '../../assets/icons/pdf.png'
import doc from '../../assets/icons/doc.png'
import xls from '../../assets/icons/xls.png'
import video from '../../assets/icons/video.png'
import attached from '../../assets/icons/attache.png'



const  item = ({Filename, filesize, FilePath, Author, handleDownload}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 MB';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const getFileExtension = (filePath) => {
    const parts = filePath.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase();
    }
    return null; // Return null for files without extensions
  };

  const renderComponentBasedOnValue = (value) => {
    switch (value) {
      case 'pdf':
        return <img src={require('../../assets/icons/pdf.png')} style={{height:25, width : 25}} />;;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <img src={require('../../assets/icons/jpg.png')} style={{height:25, width : 25}} />;
      case 'xlx':
      case 'xlsx':
            return <img src={require('../../assets/icons/xls.png')} style={{height:25, width : 25}} />;
      case 'doc':
      case 'docx':
            return <img src={require('../../assets/icons/doc.png')} style={{height:25, width : 25}} />;
      case 'mp3':
        return <img src={require('../../assets/icons/mp3.png')} style={{height:25, width : 25}} />;;
      case 'mp4':
      case 'mov':
        return <img src={require('../../assets/icons/video.png')} style={{height:25, width : 25}} />;
      default:
        return <img src={require('../../assets/icons/attache.png')} style={{height:20, width : 20}} />;
    }
  };

  const getFileSymbol = (fileExtension) => {
    const extensionToSymbolMap = {
      pdf: '📄',
      doc: '📄',
      docx: '📄',
      xls: '📄',
      xlsx: '📄',
      txt: '📄',
      jpg: '📷',
      jpeg: '📷',
      png: '📷',
      gif: '📷',
      mp3: '🎵',
      wav: '🎵',
      mp4: '🎥',
      mov: '🎥',
      zip: '📦',
      rar: '📦',
      default: '📎', // Default symbol for unknown file types
    };
  
    const lowercaseExtension = fileExtension.toLowerCase();
    return extensionToSymbolMap[lowercaseExtension] || extensionToSymbolMap.default;
  };

  return (
    <div style={{
      display : 'flex', 
      flexDirection : 'row', 
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#FAFAF9',
      borderRadius : 5,
      marginTop : 10,
      marginBottom : 10,
      borderWidth : 1,
      borderStyle : "solid",
      borderColor: "#F3F3F3",
      padding : 10
      }} >
      <div style={{width : "10%",display : 'flex', justifyContent : 'center'}}>
        {renderComponentBasedOnValue(getFileExtension(FilePath))}
      </div>
      <div style={{width : "40%", display : 'flex', justifyContent : "flex-start"}}>
          <span>
          {Filename}
          </span>
      </div>
      <div style={{width : "20%", display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
        <span>
          {Author}
        </span>
      </div>
      <div style={{width : "20%", display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
        <span>
          {formatFileSize(filesize)}
        </span>
      </div>
      <div style={{width : "10%", cursor :'pointer',display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
      <img 
      src={require('../../assets/icons/download.png')} 
      style={{height:20, width : 20}} 
      onClick={() =>handleDownload(FilePath)}
      />
      
      </div>
    </div>
  )
}


export default item