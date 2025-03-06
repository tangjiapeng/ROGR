window.HELP_IMPROVE_VIDEOJS = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function () {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for (var i = 0; i < carousels.length; i++) {
    // Add listener to  event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function (state) {
      console.log(state);
    });
  }

  if ($('#stanford-orb-tabs-widget').length > 0) {
    createStanfordOrbTabsWidget();
  }
  
  if ($('#tensoir-tabs-widget').length > 0) {
    createTensoIRTabsWidget();
  }

  if ($('#cat3d-tabs-widget').length > 0) {
    createCAT3DTabsWidget();
  }

  bulmaSlider.attach();

  $('.tabs-widget').each(function () {
    const containerElement = $(this);
    tabsWidget = new TabsWidget(containerElement);
  });

  const comparison = new ImageComparison($('.image-comparison'));

  function updateLeftImage() {
    const leftValue = $('#stanford-orb-comparison-left-select').val()[0];
    const scene = $('#stanford-orb-comparison-object-select').val();
    const basePath = './static/stanford_orb_comparisons/';
    const leftUrl = `${basePath}${scene}.${leftValue}.png`;
    const leftName = $('#stanford-orb-comparison-left-select option:selected').text();

    comparison.updateLeftImage(leftUrl, leftName);
  }

  function updateRightImage() {
    const rightValue = $('#stanford-orb-comparison-right-select').val()[0];
    const scene = $('#stanford-orb-comparison-object-select').val();
    const basePath = './static/stanford_orb_comparisons/';
    const rightUrl = `${basePath}${scene}.${rightValue}.png`;
    const rightName = $('#stanford-orb-comparison-right-select option:selected').text();

    comparison.updateRightImage(rightUrl, rightName);
  }

  function updateScene() {
    updateLeftImage();
    updateRightImage();
  }

  $('#stanford-orb-comparison-left-select').on('change', updateLeftImage);
  $('#stanford-orb-comparison-right-select').on('change', updateRightImage);
  $('#stanford-orb-comparison-object-select').on('change', updateScene);

  // Initial update
  updateLeftImage();
  updateRightImage();
  updateScene();
});


let STANFORD_ORB_OBJECTS = {
  "grogu": {
    "grogu_scene001": ["grogu_scene002", "grogu_scene003"],
    "grogu_scene002": ["grogu_scene001", "grogu_scene003"],
    "grogu_scene003": ["grogu_scene001", "grogu_scene002"],
  },
  "pepsi": {
    "pepsi_scene002": ["pepsi_scene003", "pepsi_scene004"],
    "pepsi_scene003": ["pepsi_scene004", "pepsi_scene002"],
    "pepsi_scene004": ["pepsi_scene002", "pepsi_scene003"],
  },
  "teapot": {
    "teapot_scene001": ["teapot_scene002", "teapot_scene006"],
    "teapot_scene002": ["teapot_scene001", "teapot_scene006"],
    "teapot_scene006": ["teapot_scene001", "teapot_scene002"],
  },
  "curry": {
    "curry_scene001": ["curry_scene005", "curry_scene007"],
    "curry_scene005": ["curry_scene001", "curry_scene007"],
    "curry_scene007": ["curry_scene001", "curry_scene005"],
  },
  "car": {
    "car_scene002": ["car_scene004", "car_scene006"],
    "car_scene006": ["car_scene002", "car_scene004"],
    "car_scene004": ["car_scene002", "car_scene006"],
  },
  "baking": {
    "baking_scene001": ["baking_scene002", "baking_scene003"],
    "baking_scene002": ["baking_scene001", "baking_scene003"],
    "baking_scene003": ["baking_scene001", "baking_scene002"],
  },
  "blocks": {
    "blocks_scene002": ["blocks_scene005", "blocks_scene006"],
    "blocks_scene005": ["blocks_scene002", "blocks_scene006"],
    "blocks_scene006": ["blocks_scene002", "blocks_scene005"],
  },
  "chips": {
    "chips_scene002": ["chips_scene003", "chips_scene004"],
    "chips_scene003": ["chips_scene002", "chips_scene004"],
    "chips_scene004": ["chips_scene003", "chips_scene002"],
  },
  "gnome": {
    "gnome_scene003": ["gnome_scene007", "gnome_scene005"],
    "gnome_scene005": ["gnome_scene003", "gnome_scene007"],
    "gnome_scene007": ["gnome_scene003", "gnome_scene005"],
  },
  "ball": {
    "ball_scene002": ["ball_scene004", "ball_scene003"],
    "ball_scene003": ["ball_scene002", "ball_scene004"],
    "ball_scene004": ["ball_scene002", "ball_scene003"],
  },
  "salt": {
    "salt_scene004": ["salt_scene005", "salt_scene007"],
    "salt_scene005": ["salt_scene004", "salt_scene007"],
    "salt_scene007": ["salt_scene005", "salt_scene004"],
  },
  "cactus": {
    "cactus_scene001": ["cactus_scene005", "cactus_scene007"],
    "cactus_scene005": ["cactus_scene007", "cactus_scene001"],
    "cactus_scene007": ["cactus_scene001", "cactus_scene005"],
  },
  "cup": {
    "cup_scene003": ["cup_scene006", "cup_scene007"],
    "cup_scene006": ["cup_scene003", "cup_scene007"],
    "cup_scene007": ["cup_scene003", "cup_scene006"],
  },
  "pitcher": {
    "pitcher_scene001": ["pitcher_scene005", "pitcher_scene007"],
    "pitcher_scene005": ["pitcher_scene001", "pitcher_scene007"],
    "pitcher_scene007": ["pitcher_scene001", "pitcher_scene005"],
  },
}

function createStanfordOrbTabsWidget() {
  let tabListUl = $('#stanford-orb-tabs-widget > .tabs > ul');
  // let tabListUl = $('#stanford-orb-tabs-widget > .columns > .tabs > ul');
  let tabContentDiv = $('#stanford-orb-tabs-widget > .tabs-content');

  for (let objectName in STANFORD_ORB_OBJECTS) {
    // Append Object Tabs
    tabListUl.append(`<li class="object-tab"><a>${objectName}</a></li>`);
    // Create Content for each Object Tab
    let objectContent = $('<div class="object-content"></div>');

    // Create source scene tabs widget
    let sourceTabWidget = $('<div class="tabs-widget"></div>');
    // let sourceTabList = $('<div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
    let sourceTabList = $('<div class="columns is-mobile is-vcentered"><div class="column is-4 has-text-right is-small"><p>Select Source Lighting</p></div><div class="tabs is-8 is-toggle is-small"><ul class="is-marginless"></ul></div></div>');
    let sourceTabContent = $('<div class="tabs-content has-text-centered"></div>');

    for (let sceneName in STANFORD_ORB_OBJECTS[objectName]) {
      // Add source scene tab
      sourceTabList.find('ul').append(`<li class="source-tab"><a>${sceneName}</a></li>`);
      // Add target scenes to the source scene tab content
      let targetTabWidget = createTargetSceneTabsStanfordOrb(sceneName, STANFORD_ORB_OBJECTS[objectName][sceneName]);
      sourceTabContent.append(`<div class="tabs-widget source-content">${targetTabWidget}</div>`);
    }

    // Append source tabs and content to the source tab widget
    sourceTabWidget.append(sourceTabList);
    sourceTabWidget.append(sourceTabContent);

    // Append the source tab widget to the object content
    objectContent.append(sourceTabWidget);

    tabContentDiv.append(objectContent);
  }
}

function createTargetSceneTabsStanfordOrb(srcName, tgtNames) {
  let targetTabWidget = $('<div class="tabs-widget"></div>');
  // let targetTabList = $('<div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
  let targetTabList = $('<div class="columns is-mobile is-vcentered"><div class="column is-4 has-text-right is-small"><p>Select Target Lighting</p></div><div class="tabs is-8 is-toggle is-small"><ul class="is-marginless"></ul></div></div>');
  let targetTabContent = $('<div class="tabs-content has-text-centered"></div>');

  tgtNames.forEach(tgtName => {
    targetTabList.find('ul').append(`
    <li class="target-tab"><a>${tgtName}</a></li>
    `);
    let targetContent = `
      <div class="columns is-mobile has-text-centered is-size-7-mobile is-vcentered ">
        <div class="column is-half">
          <img width="384px" src="./static/stanford_orb_envmaps_ldr/${srcName}.png" />
          <br/>
          (a) Source Lighting (not used)
        </div>
        <div class="column is-half">
          <img width="384px" src="./static/stanford_orb_envmaps_ldr/${tgtName}.png" />
          <br/>
          (b) Target Lighting
        </div>
      </div>

      <div class="columns is-mobile has-text-centered is-size-7-mobile is-vcentered ">
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/stanford_orb_results_illuminerf/${srcName}.mp4"></video>
          <br />
          (c) Source Rendering
        </div>
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/stanford_orb_results_illuminerf/${srcName}-${tgtName}.mp4"></video>
          <br />
          (d) Relit Rendering (illumiNeRF) 
        </div>
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/stanford_orb_spins_ours/${srcName}_${tgtName}.mp4"></video>
          <br />
          (e) Relit Rendering (Ours) 
        </div>
      </div>
    `;
    targetTabContent.append(`<div class="target-content">${targetContent}</div>`);
  });

  targetTabWidget.append(targetTabList);
  targetTabWidget.append(targetTabContent);

  return targetTabWidget.html();
}


let TENSOIR_OBJECTS = {
  "hotdog": ["bridge", "city", "fireplace", "forest", "night"],
  "ficus": ["bridge", "city", "fireplace", "forest", "night"],
  "lego": ["bridge", "city", "fireplace", "forest", "night"],
  "armadillo": ["bridge", "city", "fireplace", "forest", "night"],
}


function createTensoIRTabsWidget() {
  let tabListUl = $('#tensoir-tabs-widget > .tabs > ul');
  let tabContentDiv = $('#tensoir-tabs-widget > .tabs-content');

  for (let objectName in TENSOIR_OBJECTS) {
    // Append Object Tabs
    tabListUl.append(`<li class="object-tab"><a>${objectName}</a></li>`);
    // Create Content for each Object Tab
    let objectContent = $('<div class="object-content"></div>');

    // Create source scene tabs widget
    let sourceTabWidget = $('<div class="tabs-widget"></div>');
    let sourceTabList = $('<div class="columns is-mobile is-vcentered"><div class="column is-4 has-text-right is-small"><p>Select Source Lighting</p></div><div class="tabs is-8 is-toggle is-small"><ul class="is-marginless"></ul></div></div>');
    let sourceTabContent = $('<div class="tabs-content has-text-centered"></div>');

    // Add source scene tab
    sourceTabList.find('ul').append(`<li class="source-tab"><a>Sunset</a></li>`);
    // Add target scenes to the source scene tab content
    let targetTabWidget = createTargetSceneTabsTensoIR(objectName, TENSOIR_OBJECTS[objectName]);
    sourceTabContent.append(`<div class="tabs-widget source-content">${targetTabWidget}</div>`);

    // Append source tabs and content to the source tab widget
    sourceTabWidget.append(sourceTabList);
    sourceTabWidget.append(sourceTabContent);

    // Append the source tab widget to the object content
    objectContent.append(sourceTabWidget);

    tabContentDiv.append(objectContent);
  }
}

function createTargetSceneTabsTensoIR(objectName, tgtNames) {
  let targetTabWidget = $('<div class="tabs-widget"></div>');
  // let targetTabList = $('<div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
  let targetTabList = $('<div class="columns is-mobile is-vcentered"><div class="column is-4 has-text-right is-small"><p>Select Target Lighting</p></div><div class="tabs is-8 is-toggle is-small"><ul class="is-marginless"></ul></div></div>');
  let targetTabContent = $('<div class="tabs-content has-text-centered"></div>');

  tgtNames.forEach(tgtName => {
    targetTabList.find('ul').append(`
    <li class="target-tab"><a>${tgtName}</a></li>
    `);
    let targetContent = `
      <div class="columns is-mobile has-text-centered is-size-7-mobile is-vcentered ">
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/tensoir_results_fps15/${objectName}-src_spin.mp4"></video>
          <br />
          (a) Source Rendering
        </div>
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/tensoir_results_fps15/${objectName}-${tgtName}-illuminerf.mp4"></video>
          <br />
          (b) Relit Rendering (IllumiNeRF)
        </div>
      </div>
      <div class="columns is-mobile has-text-centered is-size-7-mobile is-vcentered ">
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/tensoir_results_fps15/${objectName}-${tgtName}-render.mp4"></video>
          <br />
          (c) Relit Rendering (Ours)
        </div>
        <div class="column is-half">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/tensoir_results_fps15/${objectName}-${tgtName}-gt.mp4"></video>
          <br />
          (d) Relit Rendering (GT)
        </div>
      </div>
    `;
    targetTabContent.append(`<div class="target-content">${targetContent}</div>`);
  });

  targetTabWidget.append(targetTabList);
  targetTabWidget.append(targetTabContent);

  return targetTabWidget.html();
}

let CAT3D_OBJECTS = {
  'unicorn': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'a_cat_dressed_as_the_pope': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'an_otter_wearing_sunglasses': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'hamburger': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'retro_pc_photorealistic_high_detailed': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'robot': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'rusty_gameboy': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
  'stratocaster_guitar_pixar_style': ['adams_place_bridge', 'blinds', 'circus_arena', 'modern_buildings_night', 'pedestrian_overpass', 'pink_sunrise', 'pool', 'rathaus'],
}

let CAT3D_NAMES_DICT = {
  'a_cat_dressed_as_the_pope': 'cat',
  'an_otter_wearing_sunglasses': 'otter',
  'hamburger': 'hamburger',
  'retro_pc_photorealistic_high_detailed': 'pc',
  'robot': 'robot',
  'rusty_gameboy': 'gameboy',
  'stratocaster_guitar_pixar_style': 'guitar',
  'unicorn': 'unicorn',
}

function createCAT3DTabsWidget() {
  let tabListUl = $('#cat3d-tabs-widget > .tabs > ul');
  let tabContentDiv = $('#cat3d-tabs-widget > .tabs-content');

  for (let objectName in CAT3D_OBJECTS) {
    const abbrObjectName = CAT3D_NAMES_DICT[objectName];
    // Append Object Tabs
    tabListUl.append(`<li class="object-tab"><a>${abbrObjectName}</a></li>`);
    // Create Content for each Object Tab
    let objectContent = $('<div class="object-content"></div>');

    // Create source scene tabs widget
    let sourceTabWidget = $('<div class="tabs-widget"></div>');
    let sourceTabContent = $('<div class="tabs-content has-text-centered"></div>');

    // Add target scenes to the source scene tab content
    let targetTabWidget = createTargetSceneTabsCAT3D(abbrObjectName, CAT3D_OBJECTS[objectName]);
    sourceTabContent.append(`<div class="tabs-widget source-content">${targetTabWidget}</div>`);

    // Append source tabs and content to the source tab widget
    sourceTabWidget.append(sourceTabContent);

    // Append the source tab widget to the object content
    objectContent.append(sourceTabWidget);

    tabContentDiv.append(objectContent);
  }
}

function createTargetSceneTabsCAT3D(objectName, tgtNames) {
  let targetTabWidget = $('<div class="tabs-widget"></div>');
  // let targetTabList = $('<div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
  let targetTabList = $('<div class="column is-full has-text-centered is-small"><p>Select Target Lighting</p></div><div class="tabs is-centered is-toggle is-small"><ul class="is-marginless"></ul></div>');
  let targetTabContent = $('<div class="tabs-content has-text-centered"></div>');

  tgtNames.forEach(tgtName => {
    targetTabList.find('ul').append(`
    <li class="target-tab"><a>${tgtName}</a></li>
    `);
    let targetContent = `
      <div class="columns is-mobile has-text-centered is-size-7-mobile is-vcentered ">
        <div class="column is-one-third">
          <img width="384px" src="./static/cat3d_envmaps_ldr/${tgtName}.png" />
          <br/>
          (a) Target Lighting
        </div>
        <div class="column is-one-third">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/cat3d_results/${objectName}_src.mp4"></video>
          <br />
          (b) Source Rendering
        </div>
        <div class="column is-one-third">
          <video class="video" width="512px" loop playsinline muted autoplay controls src="./static/cat3d_results/${objectName}-${tgtName}.mp4"></video>
          <br />
          (c) Relit Rendering
        </div>
      </div>
    `;
    targetTabContent.append(`<div class="target-content">${targetContent}</div>`);
  });

  targetTabWidget.append(targetTabList);
  targetTabWidget.append(targetTabContent);

  return targetTabWidget.html();
}

class TabsWidget {
  constructor(container) {
    this.container = container;
    this.activeIndex = 0;
    const listItems_1 = container.children('.tabs').children('ul').children('li');
    const listItems_2 = container.children('.columns').children('.tabs').children('ul').children('li');
    this.listItems = listItems_1.add(listItems_2)
    let self = this;
    this.listItems.click(function (e) {
      let index = $(this).index();
      self.update($(this), index);
    })

    this.update(this.listItems[this.activeIndex], this.activeIndex);
  }

  update(element, targetIndex) {
    this.activeIndex = targetIndex;
    // const tabs = this.container.children('.tabs');
    // const tabs = this.container.children('.columns').children('.tabs');
    const tabsContent = this.container.children('.tabs-content');
    this.listItems.each(function () {
      if ($(this).index() == targetIndex) {
        $(this).addClass('is-active');
      } else {
        $(this).removeClass('is-active');
      }
    });
    tabsContent.children().each(function () {
      if ($(this).index() == targetIndex) {
        $(this).show();
        $(this).find('*').each(function () {
          if ($(this).is(':visible')) {
            $(this).trigger('tab:show');
          }
        })
      } else {
        $(this).hide();
        $(this).find('*').trigger('tab:hide');
      }
    });
  }
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}


class ImageComparison {
  constructor($container) {
    this.$container = $container;
    this.position = 0.5;
    this.$canvas = $container.find('canvas');
    this.context = this.$canvas[0].getContext("2d");

    this.image1 = new Image();
    this.image2 = new Image();
    this.imagesLoaded = 0;

    this.addEventListeners();
    this.loadImages();

    const observer = new MutationObserver(() => {
      this.loadImages();
    });

    observer.observe(this.$container[0], { attributes: true, attributeFilter: ['data-left-url', 'data-right-url', 'data-left-name', 'data-right-name'] });
  }

  addEventListeners() {
    let self = this;

    function trackLocation(e) {
      self.bcr = self.$canvas[0].getBoundingClientRect();
      self.position = ((e.pageX - self.bcr.x) / self.bcr.width).clamp(0, 1);
      self.drawImages();
    }

    function trackLocationTouch(e) {
      self.bcr = self.$canvas[0].getBoundingClientRect();
      self.position = ((e.touches[0].pageX - self.bcr.x) / self.bcr.width).clamp(0, 1);
      self.drawImages();
    }

    this.$canvas.off('mousemove touchstart touchmove mouseout');
    this.$canvas.on('mousemove', trackLocation);
    this.$canvas.on('touchstart touchmove', trackLocationTouch);
    this.$canvas.on('mouseout', function () { self.position = 0.5; self.drawImages(); });

    $(window).off('resize');
    $(window).on('resize', function () {
      self.resize();
      self.drawImages();
    });
  }

  loadImages() {
    const imageUrl1 = this.$container.attr('data-left-url');
    const imageUrl2 = this.$container.attr('data-right-url');
    this.leftName = this.$container.attr('data-left-name') || 'Image 1';
    this.rightName = this.$container.attr('data-right-name') || 'Image 2';
    this.imagesLoaded = 0;
    this.position = 0.5; // Reset position to the center

    this.image1.onload = this.image2.onload = () => {
      this.imagesLoaded++;
      if (this.imagesLoaded === 2) {
        this.resize();
        this.drawImages();
      }
    };

    this.image1.src = imageUrl1;
    this.image2.src = imageUrl2;

    // Ensure event listeners are consistently applied
    this.addEventListeners();
  }

  resize() {
    const imageWidth = this.image1.width;
    const imageHeight = this.image1.height;
    const canvasWidth = this.$container.width();
    const canvasHeight = canvasWidth * imageHeight / imageWidth;
    this.$canvas[0].width = canvasWidth;
    this.$canvas[0].height = canvasHeight;
  }

  drawImages() {
    if (this.imagesLoaded < 2) {
      return;
    }

    const canvasWidth = this.$canvas[0].width;
    const canvasHeight = this.$canvas[0].height;
    const position = this.position;

    this.context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.context.drawImage(this.image1, 0, 0, this.image1.width, this.image1.height, 0, 0, canvasWidth, canvasHeight);

    const colStart = (canvasWidth * position).clamp(0.0, canvasWidth);
    const colWidth = (canvasWidth - (canvasWidth * position)).clamp(0.0, canvasWidth);
    const sourceColStart = (this.image1.width * position).clamp(0.0, this.image1.width);
    const sourceColWidth = (this.image1.width - (this.image1.width * position)).clamp(0.0, this.image1.width);
    this.context.drawImage(
      this.image2,
      sourceColStart, 0,
      sourceColWidth, this.image2.height,
      colStart, 0,
      colWidth, canvasHeight);

    this.context.beginPath();
    this.context.moveTo(canvasWidth * position, 0);
    this.context.lineTo(canvasWidth * position, canvasHeight);
    this.context.closePath();
    this.context.strokeStyle = "#AAAAAA";
    this.context.lineWidth = 5;
    this.context.stroke();

    this.context.font = "20px 'Helvetica', sans-serif";
    this.context.fillStyle = "white";
    this.context.strokeStyle = 'black';
    this.context.lineWidth = 2;
    this.context.textAlign = "left";
    this.context.textBaseline = "bottom";
    this.context.strokeText(this.leftName, 10, canvasHeight - 5);
    this.context.fillText(this.leftName, 10, canvasHeight - 5);

    this.context.textAlign = "right";
    this.context.strokeText(this.rightName, canvasWidth - 10, canvasHeight - 5);
    this.context.fillText(this.rightName, canvasWidth - 10, canvasHeight - 5);
  }

  updateLeftImage(url, name) {
    this.$container.attr('data-left-url', url);
    this.$container.attr('data-left-name', name);
    this.loadImages();
  }

  updateRightImage(url, name) {
    this.$container.attr('data-right-url', url);
    this.$container.attr('data-right-name', name);
    this.loadImages();
  }
}