//initialing values

const fileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#canvas");
const imageArea = document.querySelector("image-area")
const canvasCtx = canvas.getContext("2d");
const img    = canvas.toDataURL('image/png');
const brightness = document.querySelector("#brightness");
const saturation = document.querySelector("#saturation");
const contrast = document.querySelector("#contrast");
const blur = document.querySelector("#blur");
const grayscale = document.querySelector("#grayscale");
const opacity = document.querySelector("#opacity");
const hueRotate = document.querySelector("#hue-rotate");
const sepia = document.querySelector("#sepia");
const inversion = document.querySelector("#inversion");
const save = document.querySelector("#save");

const settings = {};
let image = null;

// retore default filter settings
function resetSettings() {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.contrast = "100";
  settings.blur = "0";
  settings.grayscale = "0";
  settings.opacity = "100";
  settings.hueRotate = "0";
  settings.sepia = "0";
  settings.inversion = "0";


  brightness.value = settings.brightness;
  saturation.value = settings.saturation;
  contrast.value = settings.contrast;
  blur.value = settings.blur;
  grayscale.value = settings.grayscale;
  opacity.value = settings.opacity;
  hueRotate.value = settings.hueRotate;
  sepia.value = settings.sepia;
  inversion.value = settings.inversion;
}

function updateSetting(key, value) {
  if (!image) return;

  settings[key] = value;
  renderImage();
}

function generateFilter() {
  const { brightness, saturation, contrast, blur, grayscale, opacity, hueRotate, sepia, inversion } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) contrast(${contrast}%) blur(${blur}px) grayscale(${grayscale}%) opacity(${opacity}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%) invert(${inversion}%)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

brightness.addEventListener("change", () =>
  updateSetting("brightness", brightness.value)
);
saturation.addEventListener("change", () =>
  updateSetting("saturation", saturation.value)
);
contrast.addEventListener("change", () =>
  updateSetting("contrast", contrast.value)
);
blur.addEventListener("change", () =>
  updateSetting("blur", blur.value)
);
grayscale.addEventListener("change", () =>
  updateSetting("grayscale", grayscale.value)
);
opacity.addEventListener("change", () =>
  updateSetting("opacity", opacity.value)
);
hueRotate.addEventListener("change", () =>
  updateSetting("hueRotate", hueRotate.value)
);
sepia.addEventListener("change", () =>
  updateSetting("sepia", sepia.value)
);
inversion.addEventListener("change", () =>
  updateSetting("inversion", inversion.value)
);
save.addEventListener('click', () => {
  document.getElementById('canvas').src = img;
});

fileInput.addEventListener("change", () => {
  image = new Image();

  image.addEventListener("load", () => {
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
});

resetSettings();
