// Your projects, in the order of the works list on wyattkedinger.com.
// Fields are the ones the Morph component reads:
//   title, location = client, year = role, camera = tools, image/hi = poster, video = embed
(function () {
  var CDN = "https://cdn.prod.website-files.com/696c6ad5186a173d7112898c/";
  var vimeo = function (id, h) {
    return "https://player.vimeo.com/video/" + id + "?" + (h ? "h=" + h + "&" : "") + "autoplay=1&title=0&byline=0&portrait=0";
  };
  var youtube = function (id) {
    return "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1";
  };
  var works = [
    { title: "ClickUp 4.0 - Work Different", client: "ClickUp", role: "Motion Designer", tools: ["Figma", "After Effects", "Premiere Pro"], poster: "6ad6f77d9b4e794b5e584613_Screenshot%202026-10-19%20at%2010.08.55%E2%80%AFPM.png", video: youtube("i5ChP35iJPw") },
    { title: "ClickUp 4.0 - Launch", client: "ClickUp", role: "", tools: ["After Effects", "Figma"], poster: "69730eec5eaf32265a78d1eb_1.jpeg", video: youtube("feAJjhF4_-M") },
    { title: "Cursor x ClickUp", client: "Cursor", role: "", tools: ["After Effects", "Figma", "Premiere Pro"], poster: "6a62d83d248cc8e4b0196da0_Cursorclickup_4.png", video: vimeo("1211279737", "9f4d84c279") },
    { title: "OpenAI x ClickUp", client: "OpenAI", role: "", tools: ["Figma", "After Effects", "Premiere Pro"], poster: "6a62d8b06c8a56d635166072_openaiclickup_2.png", video: vimeo("1211279211", "506c85394f") },
    { title: "Super Bowl LVI", client: "ClickUp", role: "VFX Artist", tools: ["Figma", "After Effects"], poster: "69730e5a70ee7f868747a408_7.jpeg", video: youtube("AirnL1NxOAw") },
    { title: "Johnny Crash", client: "Halogen", role: "Director", tools: ["After Effects", "Cinema 4D", "FL Studio", "Premiere Pro"], poster: "69731016e19f6ae17a740af4_11.jpeg", video: youtube("1AsjldJIsIA") },
    { title: "It's About Time", client: "GaTa x ClickUp", role: "Director / VFX Artist", tools: ["After Effects", "Cinema 4D"], poster: "697310c5d988797aee91b051_1.jpeg", video: youtube("OI7t8GW1jxo") },
    { title: "Afraid Of The Apps", client: "ClickUp", role: "VFX Artist", tools: ["After Effects", "Cinema 4D", "Figma"], poster: "69730d07761b276eec019df7_6.jpeg", video: youtube("RR69tFQeSH0") },
    { title: "Color Blind", client: "Ked Danger", role: "Director", tools: ["After Effects", "Premiere Pro"], poster: "69730c01afb3a2454afcce64_2.jpg", video: vimeo("1157445016") },
    { title: "LevelUp", client: "ClickUp", role: "VFX Artist / VFX Supervisor", tools: ["After Effects", "Cinema 4D"], poster: "69730d705fbcf52aafe8b61d_2.jpeg", video: vimeo("1132656229", "5834032804") }
  ];
  window.__MORPH_WORKS__ = works.map(function (w, i) {
    var img = CDN + w.poster;
    return {
      id: String(i + 1).padStart(2, "0"),
      title: w.title,
      location: w.client,
      year: w.role,
      camera: w.tools.join(" · "),
      settings: "",
      series: "",
      focus: "50% 50%",
      image: img,
      hi: img,
      caption: "",
      video: w.video
    };
  });
})();
