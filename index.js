var hiddenUpload = document.querySelector(".action-button .hidden-upload");
var image_workspaceSpan = document.querySelector(".image-workspace span");
var rotate = document.querySelectorAll(".rotate svg");
var flip = document.querySelectorAll(".flip svg");
var move = document.querySelectorAll(" .move svg");
const fileInput = document.getElementById("input-img");
const fileupload = document.getElementById("img-div");
const fileButton = document.getElementById("input-bt");
const home = document.getElementById("home");
const load = document.getElementById("load");
const home1 = document.getElementById("home-1");
const crop_container = document.getElementById("crop-container");
let imageObj;
var actionButton = document.querySelectorAll(".action-button button");

fileInput.onchange = () => {
  let selectedFile = fileInput.files[0];

  home1.style.display = "none";
  crop_container.style.display = "flex";
  document.querySelector(".image-workspace").innerHTML = `<img src="" alt="">`;
  var image_workspace = document.querySelector(".image-workspace img");

  var file = selectedFile;
  var url = window.URL.createObjectURL(new Blob([file], { type: "image/jpg" }));
  image_workspace.src = url;
  image_workspaceSpan.style.display = "none";
  fileInput.value = '';
  var options = {
    dragMode: "move",
    preview: ".img-preview",
    viewMode: 2,
    modal: false,
    background: false,
    ready: function () {
      // zoom for image
      // rotate image
      rotate[0].onclick = () => cropper.rotate(90);
      rotate[1].onclick = () => cropper.rotate(-90);

      // flip image
      var flipX = -1;
      var flipY = -1;
      flip[0].onclick = () => {
        cropper.scale(flipX, 1);
        flipX = -flipX;
      };
      flip[1].onclick = () => {
        cropper.scale(1, flipY);
        flipY = -flipY;
      };

      // download cropped image
      actionButton[0].onclick = () => {
        actionButton[0].innerText = "...";
        cropper.getCroppedCanvas().toBlob((blob) => {
          var downloadUrl = window.URL.createObjectURL(blob);
          //var a = document.createElement("a");
         // a.href = downloadUrl;
          selectedFile=blob;
          //a.download = "cropped-image.jpg"; // output image name
          // a.click()
          actionButton[0].innerText = "Crop";

          document.querySelector("#crop-container").style.display = "none";
           document.querySelector("#home-1").style.display = "flex";
         document.querySelector("#hide").style.display = "block";
         document.querySelectorAll(".container-after")[0].style.display =   "flex";
    
         document.querySelector(
            ".image-workspace-after"
          ).innerHTML = `<img src="" alt="">`;
          var image_workspace = document.querySelector(
            ".image-workspace-after img"
          );

          var file = selectedFile;
          var url = window.URL.createObjectURL(
            new Blob([file], { type: "image/jpg" })
          );
          image_workspace.src = url;
          document.querySelector(".download-after").onclick=()=>{
            putframe(selectedFile);
          }
         
          // document.querySelector('.image-workspace-after span').style.display = 'none'
        });
      };
    },
  };

  var cropper = new Cropper(image_workspace, options);

  //   fileupload.appendChild(img);
};
function putframe(selectedFile) {
  document.querySelector(
    "#img-div"
  ).innerHTML = `<img src="" alt="">`;
  var image_workspace = document.querySelector(
    "#img-div img"
  );

  var file = selectedFile;
  var url = window.URL.createObjectURL(
    new Blob([file], { type: "image/jpg" })
  );
  image_workspace.src = url;
  var mask=  $('.image-workspace-after img').css('-webkit-mask-box-image')
  $('#img-div img').css('-webkit-mask-box-image',mask)
 
//   const el=document.querySelector(".image-workspace-after")
  
// const clone = el.cloneNode(true);
//   document.querySelector("#img-div").appendChild(clone);
  document.querySelector("#hide").style.display = "none";
  document.querySelectorAll(".container-after")[0].style.display =   "none";

}
fileButton.addEventListener("click", (e) => {
  if (fileInput) {
    fileInput.click();
  }
  e.preventDefault();
});

const frames1 = document.querySelector("#fr1");
const frames2 = document.querySelector("#fr2");
const frames3 = document.querySelector("#fr3");
const frames4 = document.querySelector("#fr4");
const frames5 = document.querySelector("#fr5");

frames1.onclick = () => {
  $('.image-workspace-after img').css('-webkit-mask-box-image',"url('./assets/user_image_frame_1.png')")
 
};
frames2.onclick = () => {
  $('.image-workspace-after img').css('-webkit-mask-box-image',"url('./assets/user_image_frame_2.png')")
 
 };
 frames3.onclick = () => {
  $('.image-workspace-after img').css('-webkit-mask-box-image',"url('./assets/user_image_frame_3.png')")
 
 };
 frames4.onclick = () => {
  $('.image-workspace-after img').css('-webkit-mask-box-image',"url('./assets/user_image_frame_4.png')")
 
 };
 frames5.onclick = () => {
  $('.image-workspace-after img').css('-webkit-mask-box-image',"")
 
 };

window.onload = () => {
  // document.querySelector('.container-after').style.display="none"
  setTimeout(() => {
    home.style.display = "block";
    load.style.display = "none";
  }, 1000);
};
document.querySelector("#left-arrow-div").onclick=()=>{
  
  window.location.reload()
};
document.querySelector("#left-arrow-crop").onclick=()=>{
  document.querySelector("#crop-container").style.display = "none";
  document.querySelector("#home-1").style.display = "flex";
};
document.querySelector("#cancel").onclick=()=>{
  document.querySelectorAll(".container-after")[0].style.display =   "none";
  document.querySelector("#home-1").style.display = "flex";
    
};
// upload image
// actionButton[0].onclick = () => hiddenUpload.click()
// hiddenUpload.onchange = () => {
//     // apdate on new file selected issue removed here
