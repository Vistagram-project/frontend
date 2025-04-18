const customColor = {
    // Primary (Call to actions branding)
    PRUSSIAN_10: "rgba(231, 243, 248, 1.0)",
    PRUSSIAN_20: "rgba(195, 225, 239, 1.0)",
    PRUSSIAN_30: "rgba(135, 196, 222, 1.0)",
    PRUSSIAN_40: "rgba(79, 168, 207, 1.0)",
    PRUSSIAN_50: "rgba(24, 136, 185, 1.0)",
    PRUSSIAN_60: "rgba(6, 104, 147, 1.0)",
    PRUSSIAN_70: "rgba(4, 80, 113, 1.0)",
    PRUSSIAN_80: "rgba(3, 51, 72, 1.0)",
    PRUSSIAN_90: "rgba(0, 34, 49, 1.0)",
    PRUSSIAN_100: "rgba(0, 25, 36, 1.0)",
  
    CYAN_10: "rgba(235, 250, 250, 1.0)",
    CYAN_20: "rgba(194, 240, 240, 1.0)",
    CYAN_30: "rgba(145, 227, 227, 1.0)",
    CYAN_40: "rgba(92, 214, 214, 1.0)",
    CYAN_50: "rgba(47, 188, 188, 1.0)",
    CYAN_60: "rgba(40, 162, 162, 1.0)",
    CYAN_70: "rgba(22, 126, 126, 1.0)",
    CYAN_80: "rgba(17, 95, 95, 1.0)",
    CYAN_90: "rgba(11, 65, 65, 1.0)",
    CYAN_100: "rgba(8, 43, 43, 1.0)",
  
    // Secondary (accents, highlights, success, warnings, social media)
    GREEN_10: "rgba(235, 250, 243, 1.0)",
    GREEN_20: "rgba(202, 242, 223, 1.0)",
    GREEN_30: "rgba(169, 234, 204, 1.0)",
    GREEN_40: "rgba(129, 224, 180, 1.0)",
    GREEN_50: "rgba(87, 213, 154, 1.0)",
    GREEN_60: "rgba(50, 198, 129, 1.0)",
    GREEN_70: "rgba(30, 171, 105, 1.0)",
    GREEN_80: "rgba(23, 133, 82, 1.0)",
    GREEN_90: "rgba(19, 106, 65, 1.0)",
    GREEN_100: "rgba(13, 74, 45, 1.0)",
  
    BLUE_10: "rgba(236, 239, 249, 1.0)",
    BLUE_20: "rgba(198, 207, 241, 1.0)",
    BLUE_30: "rgba(151, 168, 229, 1.0)",
    BLUE_40: "rgba(119, 141, 221, 1.0)",
    BLUE_50: "rgba(93, 120, 215, 1.0)",
    BLUE_60: "rgba(67, 98, 208, 1.0)",
    BLUE_70: "rgba(46, 76, 184, 1.0)",
    BLUE_80: "rgba(25, 49, 139, 1.0)",
    BLUE_90: "rgba(19, 38, 107, 1.0)",
    BLUE_100: "rgba(14, 29, 81, 1.0)",
  
    PURPLE_10: "rgba(241, 237, 249, 1.0)",
    PURPLE_20: "rgba(213, 202, 237, 1.0)",
    PURPLE_30: "rgba(184, 166, 226, 1.0)",
    PURPLE_40: "rgba(156, 131, 214, 1.0)",
    PURPLE_50: "rgba(126, 93, 201, 1.0)",
    PURPLE_60: "rgba(110, 73, 195, 1.0)",
    PURPLE_70: "rgba(86, 53, 161, 1.0)",
    PURPLE_80: "rgba(65, 40, 121, 1.0)",
    PURPLE_90: "rgba(43, 27, 80, 1.0)",
    PURPLE_100: "rgba(32, 20, 60, 1.0)",
  
    RED_10: "rgba(250, 235, 236, 1.0)",
    RED_20: "rgba(240, 194, 197, 1.0)",
    RED_30: "rgba(232, 161, 166, 1.0)",
    RED_40: "rgba(221, 120, 127, 1.0)",
    RED_50: "rgba(212, 84, 92, 1.0)",
    RED_60: "rgba(199, 61, 69, 1.0)",
    RED_70: "rgba(175, 44, 53, 1.0)",
    RED_80: "rgba(147, 37, 44, 1.0)",
    RED_90: "rgba(106, 27, 32, 1.0)",
    RED_100: "rgba(82, 20, 24, 1.0)",
  
    ORANGE_10: "rgba(252, 239, 233, 1.0)",
    ORANGE_20: "rgba(245, 207, 188, 1.0)",
    ORANGE_30: "rgba(240, 178, 148, 1.0)",
    ORANGE_40: "rgba(234, 150, 108, 1.0)",
    ORANGE_50: "rgba(228, 121, 68, 1.0)",
    ORANGE_60: "rgba(217, 100, 42, 1.0)",
    ORANGE_70: "rgba(201, 86, 29, 1.0)",
    ORANGE_80: "rgba(165, 71, 24, 1.0)",
    ORANGE_90: "rgba(112, 48, 16, 1.0)",
    ORANGE_100: "rgba(80, 34, 11, 1.0)",
  
    YELLOW_10: "rgba(253, 251, 231, 1.0)",
    YELLOW_20: "rgba(249, 243, 184, 1.0)",
    YELLOW_30: "rgba(246, 235, 142, 1.0)",
    YELLOW_40: "rgba(242, 226, 90, 1.0)",
    YELLOW_50: "rgba(237, 217, 38, 1.0)",
    YELLOW_60: "rgba(223, 202, 12, 1.0)",
    YELLOW_70: "rgba(198, 180, 16, 1.0)",
    YELLOW_80: "rgba(151, 137, 12, 1.0)",
    YELLOW_90: "rgba(109, 99, 9, 1.0)",
    YELLOW_100: "rgba(66, 60, 5, 1.0)",
  
    // Neutrals (background, heading text, body text, label text)
    GREY_00: "rgba(247, 247, 248, 1.0)",
    GREY_10: "rgba(241, 241, 244, 1.0)",
    GREY_20: "rgba(227, 228, 232, 1.0)",
    GREY_30: "rgba(199, 201, 209, 1.0)",
    GREY_40: "rgba(174, 176, 188, 1.0)",
    GREY_50: "rgba(143, 146, 163, 1.0)",
    GREY_60: "rgba(103, 107, 126, 1.0)",
    GREY_70: "rgba(69, 71, 84, 1.0)",
    GREY_80: "rgba(46, 48, 56, 1.0)",
    GREY_90: "rgba(32, 33, 39, 1.0)",
    GREY_100: "rgba(25, 26, 31, 1.0)",
  
    // Appbar and Bottom Appbar
    DEEP_TEAL: "rgba(5, 74, 104, 1.0)",
  
    // Shades (backgrounds, text)
    Light: "rgba(255, 255, 255, 1.0)",
    Dark: "rgba(21, 21, 21, 1.0)"
  };
  
  export default customColor;
  