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
var actionButton = document.querySelectorAll(".action-button button");
let imageObj;
//function to handle image uploaded and then cropping it
fileInput.onchange = () => {
  let selectedFile = fileInput.files[0];

  home1.style.display = "none";
  crop_container.style.display = "flex";
  document.querySelector(".image-workspace").innerHTML = `<img src="" alt="">`;
  var image_workspace = document.querySelector(".image-workspace img");

  var file = selectedFile;
  // creating url of  object image file
  var url = window.URL.createObjectURL(new Blob([file], { type: "image/jpg" }));
  image_workspace.src = url;
  image_workspaceSpan.style.display = "none";
  fileInput.value = "";

  //Cropper options

  var options = {
    dragMode: "move",
    preview: ".img-preview",
    viewMode: 2,
    modal: false,
    background: false,
    // cropping 
    ready: function () {
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

      // After image is croped sending it to frame section and then applying frames
      actionButton[0].onclick = () => {
        actionButton[0].innerText = "...";
        cropper.getCroppedCanvas().toBlob((blob) => {
          // here blob is cropped image object assigning it to selectedfile
          selectedFile = blob;

          actionButton[0].innerText = "Crop";
          // displaying frame section and hiding crop section
          document.querySelector("#crop-container").style.display = "none";
          document.querySelector("#home-1").style.display = "flex";
          document.querySelector("#hide").style.display = "block";
          document.querySelectorAll(".container-after")[0].style.display =
            "flex";
          // adding cropped image to frame section so that frame can be applied on it
          document.querySelector(
            ".image-workspace-after"
          ).innerHTML = `<img src="" alt="">`;
          var image_workspace = document.querySelector(
            ".image-workspace-after img"
          );

          var file = selectedFile;
          // creating url of  object image file
          var url = window.URL.createObjectURL(
            new Blob([file], { type: "image/jpg" })
          );
          image_workspace.src = url;
          document.querySelector(".after-frame-bt").onclick = () => {
            afterPuttingFrame(selectedFile);
          };

          // document.querySelector('.image-workspace-after span').style.display = 'none'
        });
      };
    },
  };

  var cropper = new Cropper(image_workspace, options);
};

// function to handle file uploading
fileButton.addEventListener("click", (e) => {
  if (fileInput) {
    // now calling file input to handle file uploaded
    fileInput.click();
  }
  e.preventDefault();
});

//final function for adding image to main page
function afterPuttingFrame(selectedFile) {
  // Adding the croped image with frame and hiding frame section , container after crop
  document.querySelector("#img-div").innerHTML = `<img src="" alt="">`;
  var image_workspace = document.querySelector("#img-div img");

  var file = selectedFile;
  var url = window.URL.createObjectURL(new Blob([file], { type: "image/jpg" }));
  image_workspace.src = url;
  var mask = $(".image-workspace-after img").css("-webkit-mask-box-image");
  $("#img-div img").css("-webkit-mask-box-image", mask);
  document.querySelector("#hide").style.display = "none";
  document.querySelectorAll(".container-after")[0].style.display = "none";
}

// Applying frames

const frames1 = document.querySelector("#fr1");
const frames2 = document.querySelector("#fr2");
const frames3 = document.querySelector("#fr3");
const frames4 = document.querySelector("#fr4");
const frames5 = document.querySelector("#fr5");

frames1.onclick = () => {
  $(".image-workspace-after img").css(
    "-webkit-mask-box-image",
    "url('./assets/user_image_frame_1.png')"
  );
};
frames2.onclick = () => {
  $(".image-workspace-after img").css(
    "-webkit-mask-box-image",
    "url('./assets/user_image_frame_2.png')"
  );
};
frames3.onclick = () => {
  $(".image-workspace-after img").css(
    "-webkit-mask-box-image",
    "url('./assets/user_image_frame_3.png')"
  );
};
frames4.onclick = () => {
  $(".image-workspace-after img").css(
    "-webkit-mask-box-image",
    "url('./assets/user_image_frame_4.png')"
  );
};
frames5.onclick = () => {
  $(".image-workspace-after img").css("-webkit-mask-box-image", "");
};

// Back arrow section 
document.querySelector("#left-arrow-div").onclick = () => {
  window.location.reload();
};
document.querySelector("#left-arrow-crop").onclick = () => {
  document.querySelector("#crop-container").style.display = "none";
  document.querySelector("#home-1").style.display = "flex";
};
document.querySelector("#cancel").onclick = () => {
  document.querySelectorAll(".container-after")[0].style.display = "none";
  document.querySelector("#home-1").style.display = "flex";
};

//loading animation

window.onload = () => {
  setTimeout(() => {
    home.style.display = "block";
    load.style.display = "none";
  }, 1000);
};
