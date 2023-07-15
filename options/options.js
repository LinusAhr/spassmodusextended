const options_enum = {
  animation_speed: {
    label: "Animation Speed (ms)",
    default: 1000,
    field_type: "number",
    type: "int",
  },
  randomness: {
    label: "Randomness (0.0-1.0)",
    default: 0.25,
    field_type: "number",
    type: "float",
  },
  hue_rotation_selector: {
    label: "CSS Selector for hue_rotation",
    default: "img, video",
    field_type: "text",
    type: "string",
  },
  color_selector: {
    label: "CSS Selector for color",
    default: "p, h1, h2, h3",
    field_type: "text",
    type: "string",
  },
  background_selector: {
    label: "CSS Selector for background",
    default: "button, a",
    field_type: "text",
    type: "string",
  },
};

function onError(error) {
  console.log(`Error: ${error}`);
}

function sanitizeOptionValues(options) {
  let sanitizedOptions = {};
  Object.keys(options).forEach((key) => {
    switch (options_enum[key].type) {
      case "string":
        sanitizedOptions[key] = options[key];
        break;
      case "int":
        sanitizedOptions[key] = isNaN(parseInt(options[key]))
          ? options_enum[key].default
          : parseInt(options[key]);
        break;
      case "float":
        sanitizedOptions[key] = isNaN(parseFloat(options[key]))
          ? options_enum[key].default
          : parseFloat(options[key]);
        break;
      default:
        sanitizedOptions[key] = options[key];
        break;
    }
  });
  return sanitizedOptions;
}

function restoreSavedOptions() {
  // get options and pass them to generateOptions on success.
  browser.storage.sync.get("options").then(generateOptions, onError);
}

function saveOptions(e) {
  e.preventDefault();
  let options = {};
  document.querySelectorAll(".options-form input").forEach((element) => {
    console.log(element.value);
    options[element.id] = element.value;
  });
  browser.storage.sync.set({
    options: sanitizeOptionValues(options),
  });
}

function restoreDefaultOptions(e) {
  document.body.style.border = "2px solid green ";
  e.preventDefault();
  let options_values = {};
  Object.keys(options_enum).forEach((key) => {
    options_values[key] = options_enum[key].default;
  });
  generateOptions({ options_values });
  //saveOptions();
}

function generateOptions(options_object) {
  console.log(options_object);
  let options = options_object.options;
  let submit_button_node = document.querySelector('form button[type="submit"]');
  Object.keys(options_enum).forEach((key) => {
    document
      .querySelector("form")
      .insertBefore(generateOption(options[key], key), submit_button_node);
  });
}

function generateOption(value, key) {
  //create label
  let label = document.createElement("label");
  label.innerHTML = options_enum[key].label + ":";
  //create input element
  let input = document.createElement("input");
  input.setAttribute("name", key);
  input.setAttribute("id", key);
  input.setAttribute("value", value);
  input.setAttribute("type", options_enum[key].field_type);
  input.setAttribute("placeholder", options_enum[key].default);
  //insert input into label and return
  label.appendChild(input);
  return label;
}

document.addEventListener("DOMContentLoaded", restoreSavedOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", restoreDefaultOptions);
document.body.style.border = "2px solid red ";
