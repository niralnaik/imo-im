
var IMAGES_URL="https://imo.im/images/";var IMAGES_URL="/images/";var IVC_VERSION=1193348664500;var VOICECALL_VERSION=1193348664502;function get_img_src(filename)
{return IMAGES_URL+filename;}
function ImagePreloader()
{this.image_map={};this.preload_images=function(image_list)
{for(var i=0;i<image_list.length;i++)
{var img=new Image();img.src=get_img_src(image_list[i]);this.image_map[img.src]=img;}}
this.preload_imo_images=function()
{var protos=["aim","jabber","msn","yahoo","facebook","skype"];var img_list=[];for(var i=0;i<protos.length;i++)
{var proto=protos[i];img_list.push(proto+"_available.gif");img_list.push(proto+"_available.png");img_list.push(proto+"_away.gif");img_list.push(proto+"_away.png");img_list.push(proto+"_busy.gif");img_list.push(proto+"_busy.png");img_list.push(proto+"_offline.gif");img_list.push(proto+"_offline.png");}
img_list.push("close12_1.gif");img_list.push("collapse.gif");img_list.push("expand.gif");img_list.push("maximize.gif");img_list.push("minimize.gif");img_list.push("resize.png");img_list.push("restore.gif");img_list.push("wait.gif");img_list.push("blank.gif");img_list.push("beep.swf");img_list.push("ivc.swf?v="+IVC_VERSION);img_list.push("voicecall.swf?v="+VOICECALL_VERSION);img_list.push("sound_on.png");img_list.push("sound_off.png");this.preload_images(img_list);}
this.preload_home_page_images=function()
{var img_list=["logo_alpha.gif","aim.png","jabber.png","msn.png","yahoo.png","facebook.png","myspace.png","skype.png"];this.preload_images(img_list);}}
var g_image_preloader=new ImagePreloader();g_image_preloader.preload_home_page_images();