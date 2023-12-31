jQuery(function () {
  browser.storage.sync.get("options").then(applySpassmodus, onError);
  console.log("Spassmodus.js finished");
  // general error handler.
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  async function applySpassmodus(optionsObject) {
    // add the loading screen.
    jQuery("body").append(
      jQuery("<div>")
        .addClass("spassmodus-loader")
        .css({
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          "background-color": "black",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "z-index": "9999999",
        })
        .append(
          jQuery("<h1>").html(":^)").css({
            "font-size": "10em",
            color: "white",
          })
        )
    );
    // wait for 3seconds to allow lazyloaded content to render.
    await setTimeout(() => {
      let options = optionsObject.options;
      console.log(options);
      // apply color rotation to specified elements
      document
        .querySelectorAll(
          options.color_selector === "" ? ":not(*)" : options.color_selector
        )
        .forEach((element) => {
          console.log(element);
          element.classList.add("rainbow-color");
          element.classList.add("spassmodus");
          element.style.setProperty(
            "--sm-animation-duration",
            applyRandomness(
              parseInt(options.animation_speed),
              parseInt(options.randomness)
            ) /
              1000 +
              "s"
          );
        });
      // apply background rotation to specified elements
      document
        .querySelectorAll(
          options.background_selector === ""
            ? ":not(*)"
            : options.background_selector
        )
        .forEach((element) => {
          element.classList.add("rainbow-background");
          element.classList.add("spassmodus");
          element.style.setProperty(
            "--sm-animation-duration",
            applyRandomness(
              parseInt(options.animation_speed),
              parseInt(options.randomness)
            ) /
              1000 +
              "s"
          );
        });
      // apply hue rotation to specified elements
      document
        .querySelectorAll(
          options.hue_rotation_selector === ""
            ? ":not(*)"
            : options.hue_rotation_selector
        )
        .forEach((element) => {
          element.classList.add("hue-rotate");
          element.classList.add("spassmodus");
          element.style.setProperty(
            "--sm-animation-duration",
            applyRandomness(
              parseInt(options.animation_speed),
              parseInt(options.randomness)
            ) /
              1000 +
              "s"
          );
        });
      console.log("spassmodus applied");
      jQuery(".spassmodus-loader").remove();
    }, 3000);
  }

  function applyRandomness(number, factor) {
    let potentialRadius = number * factor;
    let actualRadius = potentialRadius * Math.random();
    let randomSign = Math.random() > 0.5 ? 1 : -1;
    return number + actualRadius * randomSign;
  }
});
