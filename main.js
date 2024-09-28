let LEVEL_DATA = [
  {
    info: "test level info",
    code: ["13012", "13013", "13014", "13015"],
  },
];

function parseGlyph(hex) {
  return "&#" + parseInt(hex, 16);
}

function parseCode(code) {
  let output = "";
  code.forEach((hex) => {
    output = output + parseGlyph(hex);
  });

  return output;
}

function parseLevelText(level) {
  function getSuffix() {
    switch (level) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
    }

    return "th";
  }

  return level + getSuffix();
}

function init() {
  let level = 1;

  if (window.location.hash) {
    level = parseInt(window.location.hash.substring(1), 10);
  }

  document.getElementById("level-display").innerHTML =
    " " + parseLevelText(level) + " ";

  document.getElementById("code").innerHTML = parseCode(
    LEVEL_DATA[level - 1].code,
  );

  if (level == 1) {
    sessionStorage.setItem("runtime", 0);
  }

  // run timer
  let timeLeft = 60;
  function processTimer() {
    if (timeLeft <= 0) {
      console.log("Timer done");
      return;
    }

    timeLeft--;
    window.setTimeout(processTimer, 1000);
    document.getElementById("time-display").innerHTML = timeLeft;
  }

  window.setTimeout(processTimer, 1000);
}

window.onload = init;
