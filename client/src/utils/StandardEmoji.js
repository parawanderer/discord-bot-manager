const EMOJIS = [
	"🀄️",
	"🃏",
	"🅰️",
	"🅱️",
	"🅾️",
	"🅿️",
	"🆎",
	"🆑",
	"🆒",
	"🆓",
	"🆔",
	"🆕",
	"🆖",
	"🆗",
	"🆘",
	"🆙",
	"🆚",
	"🇦🇨",
	"🇦🇩",
	"🇦🇪",
	"🇦🇫",
	"🇦🇬",
	"🇦🇮",
	"🇦🇱",
	"🇦🇲",
	"🇦🇴",
	"🇦🇶",
	"🇦🇷",
	"🇦🇸",
	"🇦🇹",
	"🇦🇺",
	"🇦🇼",
	"🇦🇽",
	"🇦🇿",
	"🇦",
	"🇧🇦",
	"🇧🇧",
	"🇧🇩",
	"🇧🇪",
	"🇧🇫",
	"🇧🇬",
	"🇧🇭",
	"🇧🇮",
	"🇧🇯",
	"🇧🇱",
	"🇧🇲",
	"🇧🇳",
	"🇧🇴",
	"🇧🇶",
	"🇧🇷",
	"🇧🇸",
	"🇧🇹",
	"🇧🇻",
	"🇧🇼",
	"🇧🇾",
	"🇧🇿",
	"🇧",
	"🇨🇦",
	"🇨🇨",
	"🇨🇩",
	"🇨🇫",
	"🇨🇬",
	"🇨🇭",
	"🇨🇮",
	"🇨🇰",
	"🇨🇱",
	"🇨🇲",
	"🇨🇳",
	"🇨🇴",
	"🇨🇵",
	"🇨🇷",
	"🇨🇺",
	"🇨🇻",
	"🇨🇼",
	"🇨🇽",
	"🇨🇾",
	"🇨🇿",
	"🇨",
	"🇩🇪",
	"🇩🇬",
	"🇩🇯",
	"🇩🇰",
	"🇩🇲",
	"🇩🇴",
	"🇩🇿",
	"🇩",
	"🇪🇦",
	"🇪🇨",
	"🇪🇪",
	"🇪🇬",
	"🇪🇭",
	"🇪🇷",
	"🇪🇸",
	"🇪🇹",
	"🇪🇺",
	"🇪",
	"🇫🇮",
	"🇫🇯",
	"🇫🇰",
	"🇫🇲",
	"🇫🇴",
	"🇫🇷",
	"🇫",
	"🇬🇦",
	"🇬🇧",
	"🇬🇩",
	"🇬🇪",
	"🇬🇫",
	"🇬🇬",
	"🇬🇭",
	"🇬🇮",
	"🇬🇱",
	"🇬🇲",
	"🇬🇳",
	"🇬🇵",
	"🇬🇶",
	"🇬🇷",
	"🇬🇸",
	"🇬🇹",
	"🇬🇺",
	"🇬🇼",
	"🇬🇾",
	"🇬",
	"🇭🇰",
	"🇭🇲",
	"🇭🇳",
	"🇭🇷",
	"🇭🇹",
	"🇭🇺",
	"🇭",
	"🇮🇨",
	"🇮🇩",
	"🇮🇪",
	"🇮🇱",
	"🇮🇲",
	"🇮🇳",
	"🇮🇴",
	"🇮🇶",
	"🇮🇷",
	"🇮🇸",
	"🇮🇹",
	"🇮",
	"🇯🇪",
	"🇯🇲",
	"🇯🇴",
	"🇯🇵",
	"🇯",
	"🇰🇪",
	"🇰🇬",
	"🇰🇭",
	"🇰🇮",
	"🇰🇲",
	"🇰🇳",
	"🇰🇵",
	"🇰🇷",
	"🇰🇼",
	"🇰🇾",
	"🇰🇿",
	"🇰",
	"🇱🇦",
	"🇱🇧",
	"🇱🇨",
	"🇱🇮",
	"🇱🇰",
	"🇱🇷",
	"🇱🇸",
	"🇱🇹",
	"🇱🇺",
	"🇱🇻",
	"🇱🇾",
	"🇱",
	"🇲🇦",
	"🇲🇨",
	"🇲🇩",
	"🇲🇪",
	"🇲🇫",
	"🇲🇬",
	"🇲🇭",
	"🇲🇰",
	"🇲🇱",
	"🇲🇲",
	"🇲🇳",
	"🇲🇴",
	"🇲🇵",
	"🇲🇶",
	"🇲🇷",
	"🇲🇸",
	"🇲🇹",
	"🇲🇺",
	"🇲🇻",
	"🇲🇼",
	"🇲🇽",
	"🇲🇾",
	"🇲🇿",
	"🇲",
	"🇳🇦",
	"🇳🇨",
	"🇳🇪",
	"🇳🇫",
	"🇳🇬",
	"🇳🇮",
	"🇳🇱",
	"🇳🇴",
	"🇳🇵",
	"🇳🇷",
	"🇳🇺",
	"🇳🇿",
	"🇳",
	"🇴🇲",
	"🇴",
	"🇵🇦",
	"🇵🇪",
	"🇵🇫",
	"🇵🇬",
	"🇵🇭",
	"🇵🇰",
	"🇵🇱",
	"🇵🇲",
	"🇵🇳",
	"🇵🇷",
	"🇵🇸",
	"🇵🇹",
	"🇵🇼",
	"🇵🇾",
	"🇵",
	"🇶🇦",
	"🇶",
	"🇷🇪",
	"🇷🇴",
	"🇷🇸",
	"🇷🇺",
	"🇷🇼",
	"🇷",
	"🇸🇦",
	"🇸🇧",
	"🇸🇨",
	"🇸🇩",
	"🇸🇪",
	"🇸🇬",
	"🇸🇭",
	"🇸🇮",
	"🇸🇯",
	"🇸🇰",
	"🇸🇱",
	"🇸🇲",
	"🇸🇳",
	"🇸🇴",
	"🇸🇷",
	"🇸🇸",
	"🇸🇹",
	"🇸🇻",
	"🇸🇽",
	"🇸🇾",
	"🇸🇿",
	"🇸",
	"🇹🇦",
	"🇹🇨",
	"🇹🇩",
	"🇹🇫",
	"🇹🇬",
	"🇹🇭",
	"🇹🇯",
	"🇹🇰",
	"🇹🇱",
	"🇹🇲",
	"🇹🇳",
	"🇹🇴",
	"🇹🇷",
	"🇹🇹",
	"🇹🇻",
	"🇹🇼",
	"🇹🇿",
	"🇹",
	"🇺🇦",
	"🇺🇬",
	"🇺🇲",
	"🇺🇳",
	"🇺🇸",
	"🇺🇾",
	"🇺🇿",
	"🇺",
	"🇻🇦",
	"🇻🇨",
	"🇻🇪",
	"🇻🇬",
	"🇻🇮",
	"🇻🇳",
	"🇻🇺",
	"🇻",
	"🇼🇫",
	"🇼🇸",
	"🇼",
	"🇽🇰",
	"🇽",
	"🇾🇪",
	"🇾🇹",
	"🇾",
	"🇿🇦",
	"🇿🇲",
	"🇿🇼",
	"🇿",
	"🈁",
	"🈂️",
	"🈚️",
	"🈯️",
	"🈲",
	"🈳",
	"🈴",
	"🈵",
	"🈶",
	"🈷️",
	"🈸",
	"🈹",
	"🈺",
	"🉐",
	"🉑",
	"🌀",
	"🌁",
	"🌂",
	"🌃",
	"🌄",
	"🌅",
	"🌆",
	"🌇",
	"🌈",
	"🌉",
	"🌊",
	"🌋",
	"🌌",
	"🌍",
	"🌎",
	"🌏",
	"🌐",
	"🌑",
	"🌒",
	"🌓",
	"🌔",
	"🌕",
	"🌖",
	"🌗",
	"🌘",
	"🌙",
	"🌚",
	"🌛",
	"🌜",
	"🌝",
	"🌞",
	"🌟",
	"🌠",
	"🌡️",
	"🌤️",
	"🌥️",
	"🌦️",
	"🌧️",
	"🌨️",
	"🌩️",
	"🌪️",
	"🌫️",
	"🌬️",
	"🌭",
	"🌮",
	"🌯",
	"🌰",
	"🌱",
	"🌲",
	"🌳",
	"🌴",
	"🌵",
	"🌶️",
	"🌷",
	"🌸",
	"🌹",
	"🌺",
	"🌻",
	"🌼",
	"🌽",
	"🌾",
	"🌿",
	"🍀",
	"🍁",
	"🍂",
	"🍃",
	"🍄",
	"🍅",
	"🍆",
	"🍇",
	"🍈",
	"🍉",
	"🍊",
	"🍋",
	"🍌",
	"🍍",
	"🍎",
	"🍏",
	"🍐",
	"🍑",
	"🍒",
	"🍓",
	"🍔",
	"🍕",
	"🍖",
	"🍗",
	"🍘",
	"🍙",
	"🍚",
	"🍛",
	"🍜",
	"🍝",
	"🍞",
	"🍟",
	"🍠",
	"🍡",
	"🍢",
	"🍣",
	"🍤",
	"🍥",
	"🍦",
	"🍧",
	"🍨",
	"🍩",
	"🍪",
	"🍫",
	"🍬",
	"🍭",
	"🍮",
	"🍯",
	"🍰",
	"🍱",
	"🍲",
	"🍳",
	"🍴",
	"🍵",
	"🍶",
	"🍷",
	"🍸",
	"🍹",
	"🍺",
	"🍻",
	"🍼",
	"🍽️",
	"🍾",
	"🍿",
	"🎀",
	"🎁",
	"🎂",
	"🎃",
	"🎄",
	"🎅🏻",
	"🎅🏼",
	"🎅🏽",
	"🎅🏾",
	"🎅🏿",
	"🎅",
	"🎆",
	"🎇",
	"🎈",
	"🎉",
	"🎊",
	"🎋",
	"🎌",
	"🎍",
	"🎎",
	"🎏",
	"🎐",
	"🎑",
	"🎒",
	"🎓",
	"🎖️",
	"🎗️",
	"🎙️",
	"🎚️",
	"🎛️",
	"🎞️",
	"🎟️",
	"🎠",
	"🎡",
	"🎢",
	"🎣",
	"🎤",
	"🎥",
	"🎦",
	"🎧",
	"🎨",
	"🎩",
	"🎪",
	"🎫",
	"🎬",
	"🎭",
	"🎮",
	"🎯",
	"🎰",
	"🎱",
	"🎲",
	"🎳",
	"🎴",
	"🎵",
	"🎶",
	"🎷",
	"🎸",
	"🎹",
	"🎺",
	"🎻",
	"🎼",
	"🎽",
	"🎾",
	"🎿",
	"🏀",
	"🏁",
	"🏂🏻",
	"🏂🏼",
	"🏂🏽",
	"🏂🏾",
	"🏂🏿",
	"🏂",
	"🏃🏻‍♀️",
	"🏃🏻‍♂️",
	"🏃🏻",
	"🏃🏼‍♀️",
	"🏃🏼‍♂️",
	"🏃🏼",
	"🏃🏽‍♀️",
	"🏃🏽‍♂️",
	"🏃🏽",
	"🏃🏾‍♀️",
	"🏃🏾‍♂️",
	"🏃🏾",
	"🏃🏿‍♀️",
	"🏃🏿‍♂️",
	"🏃🏿",
	"🏃‍♀️",
	"🏃‍♂️",
	"🏃",
	"🏄🏻‍♀️",
	"🏄🏻‍♂️",
	"🏄🏻",
	"🏄🏼‍♀️",
	"🏄🏼‍♂️",
	"🏄🏼",
	"🏄🏽‍♀️",
	"🏄🏽‍♂️",
	"🏄🏽",
	"🏄🏾‍♀️",
	"🏄🏾‍♂️",
	"🏄🏾",
	"🏄🏿‍♀️",
	"🏄🏿‍♂️",
	"🏄🏿",
	"🏄‍♀️",
	"🏄‍♂️",
	"🏄",
	"🏅",
	"🏆",
	"🏇🏻",
	"🏇🏼",
	"🏇🏽",
	"🏇🏾",
	"🏇🏿",
	"🏇",
	"🏈",
	"🏉",
	"🏊🏻‍♀️",
	"🏊🏻‍♂️",
	"🏊🏻",
	"🏊🏼‍♀️",
	"🏊🏼‍♂️",
	"🏊🏼",
	"🏊🏽‍♀️",
	"🏊🏽‍♂️",
	"🏊🏽",
	"🏊🏾‍♀️",
	"🏊🏾‍♂️",
	"🏊🏾",
	"🏊🏿‍♀️",
	"🏊🏿‍♂️",
	"🏊🏿",
	"🏊‍♀️",
	"🏊‍♂️",
	"🏊",
	"🏋🏻‍♀️",
	"🏋🏻‍♂️",
	"🏋🏻",
	"🏋🏼‍♀️",
	"🏋🏼‍♂️",
	"🏋🏼",
	"🏋🏽‍♀️",
	"🏋🏽‍♂️",
	"🏋🏽",
	"🏋🏾‍♀️",
	"🏋🏾‍♂️",
	"🏋🏾",
	"🏋🏿‍♀️",
	"🏋🏿‍♂️",
	"🏋🏿",
	"🏋️‍♀️",
	"🏋️‍♂️",
	"🏋️",
	"🏌🏻‍♀️",
	"🏌🏻‍♂️",
	"🏌🏻",
	"🏌🏼‍♀️",
	"🏌🏼‍♂️",
	"🏌🏼",
	"🏌🏽‍♀️",
	"🏌🏽‍♂️",
	"🏌🏽",
	"🏌🏾‍♀️",
	"🏌🏾‍♂️",
	"🏌🏾",
	"🏌🏿‍♀️",
	"🏌🏿‍♂️",
	"🏌🏿",
	"🏌️‍♀️",
	"🏌️‍♂️",
	"🏌️",
	"🏍️",
	"🏎️",
	"🏏",
	"🏐",
	"🏑",
	"🏒",
	"🏓",
	"🏔️",
	"🏕️",
	"🏖️",
	"🏗️",
	"🏘️",
	"🏙️",
	"🏚️",
	"🏛️",
	"🏜️",
	"🏝️",
	"🏞️",
	"🏟️",
	"🏠",
	"🏡",
	"🏢",
	"🏣",
	"🏤",
	"🏥",
	"🏦",
	"🏧",
	"🏨",
	"🏩",
	"🏪",
	"🏫",
	"🏬",
	"🏭",
	"🏮",
	"🏯",
	"🏰",
	"🏳️‍🌈",
	"🏳️",
	"🏴‍☠️",
	"🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
	"🏴",
	"🏵️",
	"🏷️",
	"🏸",
	"🏹",
	"🏺",
	"🏻",
	"🏼",
	"🏽",
	"🏾",
	"🏿",
	"🐀",
	"🐁",
	"🐂",
	"🐃",
	"🐄",
	"🐅",
	"🐆",
	"🐇",
	"🐈",
	"🐉",
	"🐊",
	"🐋",
	"🐌",
	"🐍",
	"🐎",
	"🐏",
	"🐐",
	"🐑",
	"🐒",
	"🐓",
	"🐔",
	"🐕‍🦺",
	"🐕",
	"🐖",
	"🐗",
	"🐘",
	"🐙",
	"🐚",
	"🐛",
	"🐜",
	"🐝",
	"🐞",
	"🐟",
	"🐠",
	"🐡",
	"🐢",
	"🐣",
	"🐤",
	"🐥",
	"🐦",
	"🐧",
	"🐨",
	"🐩",
	"🐪",
	"🐫",
	"🐬",
	"🐭",
	"🐮",
	"🐯",
	"🐰",
	"🐱",
	"🐲",
	"🐳",
	"🐴",
	"🐵",
	"🐶",
	"🐷",
	"🐸",
	"🐹",
	"🐺",
	"🐻",
	"🐼",
	"🐽",
	"🐾",
	"🐿️",
	"👀",
	"👁‍🗨",
	"👁️",
	"👂🏻",
	"👂🏼",
	"👂🏽",
	"👂🏾",
	"👂🏿",
	"👂",
	"👃🏻",
	"👃🏼",
	"👃🏽",
	"👃🏾",
	"👃🏿",
	"👃",
	"👄",
	"👅",
	"👆🏻",
	"👆🏼",
	"👆🏽",
	"👆🏾",
	"👆🏿",
	"👆",
	"👇🏻",
	"👇🏼",
	"👇🏽",
	"👇🏾",
	"👇🏿",
	"👇",
	"👈🏻",
	"👈🏼",
	"👈🏽",
	"👈🏾",
	"👈🏿",
	"👈",
	"👉🏻",
	"👉🏼",
	"👉🏽",
	"👉🏾",
	"👉🏿",
	"👉",
	"👊🏻",
	"👊🏼",
	"👊🏽",
	"👊🏾",
	"👊🏿",
	"👊",
	"👋🏻",
	"👋🏼",
	"👋🏽",
	"👋🏾",
	"👋🏿",
	"👋",
	"👌🏻",
	"👌🏼",
	"👌🏽",
	"👌🏾",
	"👌🏿",
	"👌",
	"👍🏻",
	"👍🏼",
	"👍🏽",
	"👍🏾",
	"👍🏿",
	"👍",
	"👎🏻",
	"👎🏼",
	"👎🏽",
	"👎🏾",
	"👎🏿",
	"👎",
	"👏🏻",
	"👏🏼",
	"👏🏽",
	"👏🏾",
	"👏🏿",
	"👏",
	"👐🏻",
	"👐🏼",
	"👐🏽",
	"👐🏾",
	"👐🏿",
	"👐",
	"👑",
	"👒",
	"👓",
	"👔",
	"👕",
	"👖",
	"👗",
	"👘",
	"👙",
	"👚",
	"👛",
	"👜",
	"👝",
	"👞",
	"👟",
	"👠",
	"👡",
	"👢",
	"👣",
	"👤",
	"👥",
	"👦🏻",
	"👦🏼",
	"👦🏽",
	"👦🏾",
	"👦🏿",
	"👦",
	"👧🏻",
	"👧🏼",
	"👧🏽",
	"👧🏾",
	"👧🏿",
	"👧",
	"👨🏻‍🌾",
	"👨🏻‍🍳",
	"👨🏻‍🎓",
	"👨🏻‍🎤",
	"👨🏻‍🎨",
	"👨🏻‍🏫",
	"👨🏻‍🏭",
	"👨🏻‍💻",
	"👨🏻‍💼",
	"👨🏻‍🔧",
	"👨🏻‍🔬",
	"👨🏻‍🚀",
	"👨🏻‍🚒",
	"👨🏻‍🦯",
	"👨🏻‍🦰",
	"👨🏻‍🦱",
	"👨🏻‍🦲",
	"👨🏻‍🦳",
	"👨🏻‍🦼",
	"👨🏻‍🦽",
	"👨🏻‍⚕️",
	"👨🏻‍⚖️",
	"👨🏻‍✈️",
	"👨🏻",
	"👨🏼‍🌾",
	"👨🏼‍🍳",
	"👨🏼‍🎓",
	"👨🏼‍🎤",
	"👨🏼‍🎨",
	"👨🏼‍🏫",
	"👨🏼‍🏭",
	"👨🏼‍💻",
	"👨🏼‍💼",
	"👨🏼‍🔧",
	"👨🏼‍🔬",
	"👨🏼‍🚀",
	"👨🏼‍🚒",
	"👨🏼‍🤝‍👨🏻",
	"👨🏼‍🦯",
	"👨🏼‍🦰",
	"👨🏼‍🦱",
	"👨🏼‍🦲",
	"👨🏼‍🦳",
	"👨🏼‍🦼",
	"👨🏼‍🦽",
	"👨🏼‍⚕️",
	"👨🏼‍⚖️",
	"👨🏼‍✈️",
	"👨🏼",
	"👨🏽‍🌾",
	"👨🏽‍🍳",
	"👨🏽‍🎓",
	"👨🏽‍🎤",
	"👨🏽‍🎨",
	"👨🏽‍🏫",
	"👨🏽‍🏭",
	"👨🏽‍💻",
	"👨🏽‍💼",
	"👨🏽‍🔧",
	"👨🏽‍🔬",
	"👨🏽‍🚀",
	"👨🏽‍🚒",
	"👨🏽‍🤝‍👨🏻",
	"👨🏽‍🤝‍👨🏼",
	"👨🏽‍🦯",
	"👨🏽‍🦰",
	"👨🏽‍🦱",
	"👨🏽‍🦲",
	"👨🏽‍🦳",
	"👨🏽‍🦼",
	"👨🏽‍🦽",
	"👨🏽‍⚕️",
	"👨🏽‍⚖️",
	"👨🏽‍✈️",
	"👨🏽",
	"👨🏾‍🌾",
	"👨🏾‍🍳",
	"👨🏾‍🎓",
	"👨🏾‍🎤",
	"👨🏾‍🎨",
	"👨🏾‍🏫",
	"👨🏾‍🏭",
	"👨🏾‍💻",
	"👨🏾‍💼",
	"👨🏾‍🔧",
	"👨🏾‍🔬",
	"👨🏾‍🚀",
	"👨🏾‍🚒",
	"👨🏾‍🤝‍👨🏻",
	"👨🏾‍🤝‍👨🏼",
	"👨🏾‍🤝‍👨🏽",
	"👨🏾‍🦯",
	"👨🏾‍🦰",
	"👨🏾‍🦱",
	"👨🏾‍🦲",
	"👨🏾‍🦳",
	"👨🏾‍🦼",
	"👨🏾‍🦽",
	"👨🏾‍⚕️",
	"👨🏾‍⚖️",
	"👨🏾‍✈️",
	"👨🏾",
	"👨🏿‍🌾",
	"👨🏿‍🍳",
	"👨🏿‍🎓",
	"👨🏿‍🎤",
	"👨🏿‍🎨",
	"👨🏿‍🏫",
	"👨🏿‍🏭",
	"👨🏿‍💻",
	"👨🏿‍💼",
	"👨🏿‍🔧",
	"👨🏿‍🔬",
	"👨🏿‍🚀",
	"👨🏿‍🚒",
	"👨🏿‍🤝‍👨🏻",
	"👨🏿‍🤝‍👨🏼",
	"👨🏿‍🤝‍👨🏽",
	"👨🏿‍🤝‍👨🏾",
	"👨🏿‍🦯",
	"👨🏿‍🦰",
	"👨🏿‍🦱",
	"👨🏿‍🦲",
	"👨🏿‍🦳",
	"👨🏿‍🦼",
	"👨🏿‍🦽",
	"👨🏿‍⚕️",
	"👨🏿‍⚖️",
	"👨🏿‍✈️",
	"👨🏿",
	"👨‍🌾",
	"👨‍🍳",
	"👨‍🎓",
	"👨‍🎤",
	"👨‍🎨",
	"👨‍🏫",
	"👨‍🏭",
	"👨‍👦‍👦",
	"👨‍👦",
	"👨‍👧‍👦",
	"👨‍👧‍👧",
	"👨‍👧",
	"👨‍👨‍👦‍👦",
	"👨‍👨‍👦",
	"👨‍👨‍👧‍👦",
	"👨‍👨‍👧‍👧",
	"👨‍👨‍👧",
	"👨‍👩‍👦‍👦",
	"👨‍👩‍👦",
	"👨‍👩‍👧‍👦",
	"👨‍👩‍👧‍👧",
	"👨‍👩‍👧",
	"👨‍💻",
	"👨‍💼",
	"👨‍🔧",
	"👨‍🔬",
	"👨‍🚀",
	"👨‍🚒",
	"👨‍🦯",
	"👨‍🦰",
	"👨‍🦱",
	"👨‍🦲",
	"👨‍🦳",
	"👨‍🦼",
	"👨‍🦽",
	"👨‍⚕️",
	"👨‍⚖️",
	"👨‍✈️",
	"👨‍❤️‍👨",
	"👨‍❤️‍💋‍👨",
	"👨",
	"👩🏻‍🌾",
	"👩🏻‍🍳",
	"👩🏻‍🎓",
	"👩🏻‍🎤",
	"👩🏻‍🎨",
	"👩🏻‍🏫",
	"👩🏻‍🏭",
	"👩🏻‍💻",
	"👩🏻‍💼",
	"👩🏻‍🔧",
	"👩🏻‍🔬",
	"👩🏻‍🚀",
	"👩🏻‍🚒",
	"👩🏻‍🤝‍👨🏼",
	"👩🏻‍🤝‍👨🏽",
	"👩🏻‍🤝‍👨🏾",
	"👩🏻‍🤝‍👨🏿",
	"👩🏻‍🦯",
	"👩🏻‍🦰",
	"👩🏻‍🦱",
	"👩🏻‍🦲",
	"👩🏻‍🦳",
	"👩🏻‍🦼",
	"👩🏻‍🦽",
	"👩🏻‍⚕️",
	"👩🏻‍⚖️",
	"👩🏻‍✈️",
	"👩🏻",
	"👩🏼‍🌾",
	"👩🏼‍🍳",
	"👩🏼‍🎓",
	"👩🏼‍🎤",
	"👩🏼‍🎨",
	"👩🏼‍🏫",
	"👩🏼‍🏭",
	"👩🏼‍💻",
	"👩🏼‍💼",
	"👩🏼‍🔧",
	"👩🏼‍🔬",
	"👩🏼‍🚀",
	"👩🏼‍🚒",
	"👩🏼‍🤝‍👨🏻",
	"👩🏼‍🤝‍👨🏽",
	"👩🏼‍🤝‍👨🏾",
	"👩🏼‍🤝‍👨🏿",
	"👩🏼‍🤝‍👩🏻",
	"👩🏼‍🦯",
	"👩🏼‍🦰",
	"👩🏼‍🦱",
	"👩🏼‍🦲",
	"👩🏼‍🦳",
	"👩🏼‍🦼",
	"👩🏼‍🦽",
	"👩🏼‍⚕️",
	"👩🏼‍⚖️",
	"👩🏼‍✈️",
	"👩🏼",
	"👩🏽‍🌾",
	"👩🏽‍🍳",
	"👩🏽‍🎓",
	"👩🏽‍🎤",
	"👩🏽‍🎨",
	"👩🏽‍🏫",
	"👩🏽‍🏭",
	"👩🏽‍💻",
	"👩🏽‍💼",
	"👩🏽‍🔧",
	"👩🏽‍🔬",
	"👩🏽‍🚀",
	"👩🏽‍🚒",
	"👩🏽‍🤝‍👨🏻",
	"👩🏽‍🤝‍👨🏼",
	"👩🏽‍🤝‍👨🏾",
	"👩🏽‍🤝‍👨🏿",
	"👩🏽‍🤝‍👩🏻",
	"👩🏽‍🤝‍👩🏼",
	"👩🏽‍🦯",
	"👩🏽‍🦰",
	"👩🏽‍🦱",
	"👩🏽‍🦲",
	"👩🏽‍🦳",
	"👩🏽‍🦼",
	"👩🏽‍🦽",
	"👩🏽‍⚕️",
	"👩🏽‍⚖️",
	"👩🏽‍✈️",
	"👩🏽",
	"👩🏾‍🌾",
	"👩🏾‍🍳",
	"👩🏾‍🎓",
	"👩🏾‍🎤",
	"👩🏾‍🎨",
	"👩🏾‍🏫",
	"👩🏾‍🏭",
	"👩🏾‍💻",
	"👩🏾‍💼",
	"👩🏾‍🔧",
	"👩🏾‍🔬",
	"👩🏾‍🚀",
	"👩🏾‍🚒",
	"👩🏾‍🤝‍👨🏻",
	"👩🏾‍🤝‍👨🏼",
	"👩🏾‍🤝‍👨🏽",
	"👩🏾‍🤝‍👨🏿",
	"👩🏾‍🤝‍👩🏻",
	"👩🏾‍🤝‍👩🏼",
	"👩🏾‍🤝‍👩🏽",
	"👩🏾‍🦯",
	"👩🏾‍🦰",
	"👩🏾‍🦱",
	"👩🏾‍🦲",
	"👩🏾‍🦳",
	"👩🏾‍🦼",
	"👩🏾‍🦽",
	"👩🏾‍⚕️",
	"👩🏾‍⚖️",
	"👩🏾‍✈️",
	"👩🏾",
	"👩🏿‍🌾",
	"👩🏿‍🍳",
	"👩🏿‍🎓",
	"👩🏿‍🎤",
	"👩🏿‍🎨",
	"👩🏿‍🏫",
	"👩🏿‍🏭",
	"👩🏿‍💻",
	"👩🏿‍💼",
	"👩🏿‍🔧",
	"👩🏿‍🔬",
	"👩🏿‍🚀",
	"👩🏿‍🚒",
	"👩🏿‍🤝‍👨🏻",
	"👩🏿‍🤝‍👨🏼",
	"👩🏿‍🤝‍👨🏽",
	"👩🏿‍🤝‍👨🏾",
	"👩🏿‍🤝‍👩🏻",
	"👩🏿‍🤝‍👩🏼",
	"👩🏿‍🤝‍👩🏽",
	"👩🏿‍🤝‍👩🏾",
	"👩🏿‍🦯",
	"👩🏿‍🦰",
	"👩🏿‍🦱",
	"👩🏿‍🦲",
	"👩🏿‍🦳",
	"👩🏿‍🦼",
	"👩🏿‍🦽",
	"👩🏿‍⚕️",
	"👩🏿‍⚖️",
	"👩🏿‍✈️",
	"👩🏿",
	"👩‍🌾",
	"👩‍🍳",
	"👩‍🎓",
	"👩‍🎤",
	"👩‍🎨",
	"👩‍🏫",
	"👩‍🏭",
	"👩‍👦‍👦",
	"👩‍👦",
	"👩‍👧‍👦",
	"👩‍👧‍👧",
	"👩‍👧",
	"👩‍👩‍👦‍👦",
	"👩‍👩‍👦",
	"👩‍👩‍👧‍👦",
	"👩‍👩‍👧‍👧",
	"👩‍👩‍👧",
	"👩‍💻",
	"👩‍💼",
	"👩‍🔧",
	"👩‍🔬",
	"👩‍🚀",
	"👩‍🚒",
	"👩‍🦯",
	"👩‍🦰",
	"👩‍🦱",
	"👩‍🦲",
	"👩‍🦳",
	"👩‍🦼",
	"👩‍🦽",
	"👩‍⚕️",
	"👩‍⚖️",
	"👩‍✈️",
	"👩‍❤️‍👨",
	"👩‍❤️‍👩",
	"👩‍❤️‍💋‍👨",
	"👩‍❤️‍💋‍👩",
	"👩",
	"👪",
	"👫🏻",
	"👫🏼",
	"👫🏽",
	"👫🏾",
	"👫🏿",
	"👫",
	"👬🏻",
	"👬🏼",
	"👬🏽",
	"👬🏾",
	"👬🏿",
	"👬",
	"👭🏻",
	"👭🏼",
	"👭🏽",
	"👭🏾",
	"👭🏿",
	"👭",
	"👮🏻‍♀️",
	"👮🏻‍♂️",
	"👮🏻",
	"👮🏼‍♀️",
	"👮🏼‍♂️",
	"👮🏼",
	"👮🏽‍♀️",
	"👮🏽‍♂️",
	"👮🏽",
	"👮🏾‍♀️",
	"👮🏾‍♂️",
	"👮🏾",
	"👮🏿‍♀️",
	"👮🏿‍♂️",
	"👮🏿",
	"👮‍♀️",
	"👮‍♂️",
	"👮",
	"👯‍♀️",
	"👯‍♂️",
	"👯",
	"👰🏻",
	"👰🏼",
	"👰🏽",
	"👰🏾",
	"👰🏿",
	"👰",
	"👱🏻‍♀️",
	"👱🏻‍♂️",
	"👱🏻",
	"👱🏼‍♀️",
	"👱🏼‍♂️",
	"👱🏼",
	"👱🏽‍♀️",
	"👱🏽‍♂️",
	"👱🏽",
	"👱🏾‍♀️",
	"👱🏾‍♂️",
	"👱🏾",
	"👱🏿‍♀️",
	"👱🏿‍♂️",
	"👱🏿",
	"👱‍♀️",
	"👱‍♂️",
	"👱",
	"👲🏻",
	"👲🏼",
	"👲🏽",
	"👲🏾",
	"👲🏿",
	"👲",
	"👳🏻‍♀️",
	"👳🏻‍♂️",
	"👳🏻",
	"👳🏼‍♀️",
	"👳🏼‍♂️",
	"👳🏼",
	"👳🏽‍♀️",
	"👳🏽‍♂️",
	"👳🏽",
	"👳🏾‍♀️",
	"👳🏾‍♂️",
	"👳🏾",
	"👳🏿‍♀️",
	"👳🏿‍♂️",
	"👳🏿",
	"👳‍♀️",
	"👳‍♂️",
	"👳",
	"👴🏻",
	"👴🏼",
	"👴🏽",
	"👴🏾",
	"👴🏿",
	"👴",
	"👵🏻",
	"👵🏼",
	"👵🏽",
	"👵🏾",
	"👵🏿",
	"👵",
	"👶🏻",
	"👶🏼",
	"👶🏽",
	"👶🏾",
	"👶🏿",
	"👶",
	"👷🏻‍♀️",
	"👷🏻‍♂️",
	"👷🏻",
	"👷🏼‍♀️",
	"👷🏼‍♂️",
	"👷🏼",
	"👷🏽‍♀️",
	"👷🏽‍♂️",
	"👷🏽",
	"👷🏾‍♀️",
	"👷🏾‍♂️",
	"👷🏾",
	"👷🏿‍♀️",
	"👷🏿‍♂️",
	"👷🏿",
	"👷‍♀️",
	"👷‍♂️",
	"👷",
	"👸🏻",
	"👸🏼",
	"👸🏽",
	"👸🏾",
	"👸🏿",
	"👸",
	"👹",
	"👺",
	"👻",
	"👼🏻",
	"👼🏼",
	"👼🏽",
	"👼🏾",
	"👼🏿",
	"👼",
	"👽",
	"👾",
	"👿",
	"💀",
	"💁🏻‍♀️",
	"💁🏻‍♂️",
	"💁🏻",
	"💁🏼‍♀️",
	"💁🏼‍♂️",
	"💁🏼",
	"💁🏽‍♀️",
	"💁🏽‍♂️",
	"💁🏽",
	"💁🏾‍♀️",
	"💁🏾‍♂️",
	"💁🏾",
	"💁🏿‍♀️",
	"💁🏿‍♂️",
	"💁🏿",
	"💁‍♀️",
	"💁‍♂️",
	"💁",
	"💂🏻‍♀️",
	"💂🏻‍♂️",
	"💂🏻",
	"💂🏼‍♀️",
	"💂🏼‍♂️",
	"💂🏼",
	"💂🏽‍♀️",
	"💂🏽‍♂️",
	"💂🏽",
	"💂🏾‍♀️",
	"💂🏾‍♂️",
	"💂🏾",
	"💂🏿‍♀️",
	"💂🏿‍♂️",
	"💂🏿",
	"💂‍♀️",
	"💂‍♂️",
	"💂",
	"💃🏻",
	"💃🏼",
	"💃🏽",
	"💃🏾",
	"💃🏿",
	"💃",
	"💄",
	"💅🏻",
	"💅🏼",
	"💅🏽",
	"💅🏾",
	"💅🏿",
	"💅",
	"💆🏻‍♀️",
	"💆🏻‍♂️",
	"💆🏻",
	"💆🏼‍♀️",
	"💆🏼‍♂️",
	"💆🏼",
	"💆🏽‍♀️",
	"💆🏽‍♂️",
	"💆🏽",
	"💆🏾‍♀️",
	"💆🏾‍♂️",
	"💆🏾",
	"💆🏿‍♀️",
	"💆🏿‍♂️",
	"💆🏿",
	"💆‍♀️",
	"💆‍♂️",
	"💆",
	"💇🏻‍♀️",
	"💇🏻‍♂️",
	"💇🏻",
	"💇🏼‍♀️",
	"💇🏼‍♂️",
	"💇🏼",
	"💇🏽‍♀️",
	"💇🏽‍♂️",
	"💇🏽",
	"💇🏾‍♀️",
	"💇🏾‍♂️",
	"💇🏾",
	"💇🏿‍♀️",
	"💇🏿‍♂️",
	"💇🏿",
	"💇‍♀️",
	"💇‍♂️",
	"💇",
	"💈",
	"💉",
	"💊",
	"💋",
	"💌",
	"💍",
	"💎",
	"💏",
	"💐",
	"💑",
	"💒",
	"💓",
	"💔",
	"💕",
	"💖",
	"💗",
	"💘",
	"💙",
	"💚",
	"💛",
	"💜",
	"💝",
	"💞",
	"💟",
	"💠",
	"💡",
	"💢",
	"💣",
	"💤",
	"💥",
	"💦",
	"💧",
	"💨",
	"💩",
	"💪🏻",
	"💪🏼",
	"💪🏽",
	"💪🏾",
	"💪🏿",
	"💪",
	"💫",
	"💬",
	"💭",
	"💮",
	"💯",
	"💰",
	"💱",
	"💲",
	"💳",
	"💴",
	"💵",
	"💶",
	"💷",
	"💸",
	"💹",
	"💺",
	"💻",
	"💼",
	"💽",
	"💾",
	"💿",
	"📀",
	"📁",
	"📂",
	"📃",
	"📄",
	"📅",
	"📆",
	"📇",
	"📈",
	"📉",
	"📊",
	"📋",
	"📌",
	"📍",
	"📎",
	"📏",
	"📐",
	"📑",
	"📒",
	"📓",
	"📔",
	"📕",
	"📖",
	"📗",
	"📘",
	"📙",
	"📚",
	"📛",
	"📜",
	"📝",
	"📞",
	"📟",
	"📠",
	"📡",
	"📢",
	"📣",
	"📤",
	"📥",
	"📦",
	"📧",
	"📨",
	"📩",
	"📪",
	"📫",
	"📬",
	"📭",
	"📮",
	"📯",
	"📰",
	"📱",
	"📲",
	"📳",
	"📴",
	"📵",
	"📶",
	"📷",
	"📸",
	"📹",
	"📺",
	"📻",
	"📼",
	"📽️",
	"📿",
	"🔀",
	"🔁",
	"🔂",
	"🔃",
	"🔄",
	"🔅",
	"🔆",
	"🔇",
	"🔈",
	"🔉",
	"🔊",
	"🔋",
	"🔌",
	"🔍",
	"🔎",
	"🔏",
	"🔐",
	"🔑",
	"🔒",
	"🔓",
	"🔔",
	"🔕",
	"🔖",
	"🔗",
	"🔘",
	"🔙",
	"🔚",
	"🔛",
	"🔜",
	"🔝",
	"🔞",
	"🔟",
	"🔠",
	"🔡",
	"🔢",
	"🔣",
	"🔤",
	"🔥",
	"🔦",
	"🔧",
	"🔨",
	"🔩",
	"🔪",
	"🔫",
	"🔬",
	"🔭",
	"🔮",
	"🔯",
	"🔰",
	"🔱",
	"🔲",
	"🔳",
	"🔴",
	"🔵",
	"🔶",
	"🔷",
	"🔸",
	"🔹",
	"🔺",
	"🔻",
	"🔼",
	"🔽",
	"🕉️",
	"🕊️",
	"🕋",
	"🕌",
	"🕍",
	"🕎",
	"🕐",
	"🕑",
	"🕒",
	"🕓",
	"🕔",
	"🕕",
	"🕖",
	"🕗",
	"🕘",
	"🕙",
	"🕚",
	"🕛",
	"🕜",
	"🕝",
	"🕞",
	"🕟",
	"🕠",
	"🕡",
	"🕢",
	"🕣",
	"🕤",
	"🕥",
	"🕦",
	"🕧",
	"🕯️",
	"🕰️",
	"🕳️",
	"🕴🏻‍♀️",
	"🕴🏻‍♂️",
	"🕴🏻",
	"🕴🏼‍♀️",
	"🕴🏼‍♂️",
	"🕴🏼",
	"🕴🏽‍♀️",
	"🕴🏽‍♂️",
	"🕴🏽",
	"🕴🏾‍♀️",
	"🕴🏾‍♂️",
	"🕴🏾",
	"🕴🏿‍♀️",
	"🕴🏿‍♂️",
	"🕴🏿",
	"🕴️‍♀️",
	"🕴️‍♂️",
	"🕴️",
	"🕵🏻‍♀️",
	"🕵🏻‍♂️",
	"🕵🏻",
	"🕵🏼‍♀️",
	"🕵🏼‍♂️",
	"🕵🏼",
	"🕵🏽‍♀️",
	"🕵🏽‍♂️",
	"🕵🏽",
	"🕵🏾‍♀️",
	"🕵🏾‍♂️",
	"🕵🏾",
	"🕵🏿‍♀️",
	"🕵🏿‍♂️",
	"🕵🏿",
	"🕵️‍♀️",
	"🕵️‍♂️",
	"🕵️",
	"🕶️",
	"🕷️",
	"🕸️",
	"🕹️",
	"🕺🏻",
	"🕺🏼",
	"🕺🏽",
	"🕺🏾",
	"🕺🏿",
	"🕺",
	"🖇️",
	"🖊️",
	"🖋️",
	"🖌️",
	"🖍️",
	"🖐🏻",
	"🖐🏼",
	"🖐🏽",
	"🖐🏾",
	"🖐🏿",
	"🖐️",
	"🖕🏻",
	"🖕🏼",
	"🖕🏽",
	"🖕🏾",
	"🖕🏿",
	"🖕",
	"🖖🏻",
	"🖖🏼",
	"🖖🏽",
	"🖖🏾",
	"🖖🏿",
	"🖖",
	"🖤",
	"🖥️",
	"🖨️",
	"🖱️",
	"🖲️",
	"🖼️",
	"🗂️",
	"🗃️",
	"🗄️",
	"🗑️",
	"🗒️",
	"🗓️",
	"🗜️",
	"🗝️",
	"🗞️",
	"🗡️",
	"🗣️",
	"🗨️",
	"🗯️",
	"🗳️",
	"🗺️",
	"🗻",
	"🗼",
	"🗽",
	"🗾",
	"🗿",
	"😀",
	"😁",
	"😂",
	"😃",
	"😄",
	"😅",
	"😆",
	"😇",
	"😈",
	"😉",
	"😊",
	"😋",
	"😌",
	"😍",
	"😎",
	"😏",
	"😐",
	"😑",
	"😒",
	"😓",
	"😔",
	"😕",
	"😖",
	"😗",
	"😘",
	"😙",
	"😚",
	"😛",
	"😜",
	"😝",
	"😞",
	"😟",
	"😠",
	"😡",
	"😢",
	"😣",
	"😤",
	"😥",
	"😦",
	"😧",
	"😨",
	"😩",
	"😪",
	"😫",
	"😬",
	"😭",
	"😮",
	"😯",
	"😰",
	"😱",
	"😲",
	"😳",
	"😴",
	"😵",
	"😶",
	"😷",
	"😸",
	"😹",
	"😺",
	"😻",
	"😼",
	"😽",
	"😾",
	"😿",
	"🙀",
	"🙁",
	"🙂",
	"🙃",
	"🙄",
	"🙅🏻‍♀️",
	"🙅🏻‍♂️",
	"🙅🏻",
	"🙅🏼‍♀️",
	"🙅🏼‍♂️",
	"🙅🏼",
	"🙅🏽‍♀️",
	"🙅🏽‍♂️",
	"🙅🏽",
	"🙅🏾‍♀️",
	"🙅🏾‍♂️",
	"🙅🏾",
	"🙅🏿‍♀️",
	"🙅🏿‍♂️",
	"🙅🏿",
	"🙅‍♀️",
	"🙅‍♂️",
	"🙅",
	"🙆🏻‍♀️",
	"🙆🏻‍♂️",
	"🙆🏻",
	"🙆🏼‍♀️",
	"🙆🏼‍♂️",
	"🙆🏼",
	"🙆🏽‍♀️",
	"🙆🏽‍♂️",
	"🙆🏽",
	"🙆🏾‍♀️",
	"🙆🏾‍♂️",
	"🙆🏾",
	"🙆🏿‍♀️",
	"🙆🏿‍♂️",
	"🙆🏿",
	"🙆‍♀️",
	"🙆‍♂️",
	"🙆",
	"🙇🏻‍♀️",
	"🙇🏻‍♂️",
	"🙇🏻",
	"🙇🏼‍♀️",
	"🙇🏼‍♂️",
	"🙇🏼",
	"🙇🏽‍♀️",
	"🙇🏽‍♂️",
	"🙇🏽",
	"🙇🏾‍♀️",
	"🙇🏾‍♂️",
	"🙇🏾",
	"🙇🏿‍♀️",
	"🙇🏿‍♂️",
	"🙇🏿",
	"🙇‍♀️",
	"🙇‍♂️",
	"🙇",
	"🙈",
	"🙉",
	"🙊",
	"🙋🏻‍♀️",
	"🙋🏻‍♂️",
	"🙋🏻",
	"🙋🏼‍♀️",
	"🙋🏼‍♂️",
	"🙋🏼",
	"🙋🏽‍♀️",
	"🙋🏽‍♂️",
	"🙋🏽",
	"🙋🏾‍♀️",
	"🙋🏾‍♂️",
	"🙋🏾",
	"🙋🏿‍♀️",
	"🙋🏿‍♂️",
	"🙋🏿",
	"🙋‍♀️",
	"🙋‍♂️",
	"🙋",
	"🙌🏻",
	"🙌🏼",
	"🙌🏽",
	"🙌🏾",
	"🙌🏿",
	"🙌",
	"🙍🏻‍♀️",
	"🙍🏻‍♂️",
	"🙍🏻",
	"🙍🏼‍♀️",
	"🙍🏼‍♂️",
	"🙍🏼",
	"🙍🏽‍♀️",
	"🙍🏽‍♂️",
	"🙍🏽",
	"🙍🏾‍♀️",
	"🙍🏾‍♂️",
	"🙍🏾",
	"🙍🏿‍♀️",
	"🙍🏿‍♂️",
	"🙍🏿",
	"🙍‍♀️",
	"🙍‍♂️",
	"🙍",
	"🙎🏻‍♀️",
	"🙎🏻‍♂️",
	"🙎🏻",
	"🙎🏼‍♀️",
	"🙎🏼‍♂️",
	"🙎🏼",
	"🙎🏽‍♀️",
	"🙎🏽‍♂️",
	"🙎🏽",
	"🙎🏾‍♀️",
	"🙎🏾‍♂️",
	"🙎🏾",
	"🙎🏿‍♀️",
	"🙎🏿‍♂️",
	"🙎🏿",
	"🙎‍♀️",
	"🙎‍♂️",
	"🙎",
	"🙏🏻",
	"🙏🏼",
	"🙏🏽",
	"🙏🏾",
	"🙏🏿",
	"🙏",
	"🚀",
	"🚁",
	"🚂",
	"🚃",
	"🚄",
	"🚅",
	"🚆",
	"🚇",
	"🚈",
	"🚉",
	"🚊",
	"🚋",
	"🚌",
	"🚍",
	"🚎",
	"🚏",
	"🚐",
	"🚑",
	"🚒",
	"🚓",
	"🚔",
	"🚕",
	"🚖",
	"🚗",
	"🚘",
	"🚙",
	"🚚",
	"🚛",
	"🚜",
	"🚝",
	"🚞",
	"🚟",
	"🚠",
	"🚡",
	"🚢",
	"🚣🏻‍♀️",
	"🚣🏻‍♂️",
	"🚣🏻",
	"🚣🏼‍♀️",
	"🚣🏼‍♂️",
	"🚣🏼",
	"🚣🏽‍♀️",
	"🚣🏽‍♂️",
	"🚣🏽",
	"🚣🏾‍♀️",
	"🚣🏾‍♂️",
	"🚣🏾",
	"🚣🏿‍♀️",
	"🚣🏿‍♂️",
	"🚣🏿",
	"🚣‍♀️",
	"🚣‍♂️",
	"🚣",
	"🚤",
	"🚥",
	"🚦",
	"🚧",
	"🚨",
	"🚩",
	"🚪",
	"🚫",
	"🚬",
	"🚭",
	"🚮",
	"🚯",
	"🚰",
	"🚱",
	"🚲",
	"🚳",
	"🚴🏻‍♀️",
	"🚴🏻‍♂️",
	"🚴🏻",
	"🚴🏼‍♀️",
	"🚴🏼‍♂️",
	"🚴🏼",
	"🚴🏽‍♀️",
	"🚴🏽‍♂️",
	"🚴🏽",
	"🚴🏾‍♀️",
	"🚴🏾‍♂️",
	"🚴🏾",
	"🚴🏿‍♀️",
	"🚴🏿‍♂️",
	"🚴🏿",
	"🚴‍♀️",
	"🚴‍♂️",
	"🚴",
	"🚵🏻‍♀️",
	"🚵🏻‍♂️",
	"🚵🏻",
	"🚵🏼‍♀️",
	"🚵🏼‍♂️",
	"🚵🏼",
	"🚵🏽‍♀️",
	"🚵🏽‍♂️",
	"🚵🏽",
	"🚵🏾‍♀️",
	"🚵🏾‍♂️",
	"🚵🏾",
	"🚵🏿‍♀️",
	"🚵🏿‍♂️",
	"🚵🏿",
	"🚵‍♀️",
	"🚵‍♂️",
	"🚵",
	"🚶🏻‍♀️",
	"🚶🏻‍♂️",
	"🚶🏻",
	"🚶🏼‍♀️",
	"🚶🏼‍♂️",
	"🚶🏼",
	"🚶🏽‍♀️",
	"🚶🏽‍♂️",
	"🚶🏽",
	"🚶🏾‍♀️",
	"🚶🏾‍♂️",
	"🚶🏾",
	"🚶🏿‍♀️",
	"🚶🏿‍♂️",
	"🚶🏿",
	"🚶‍♀️",
	"🚶‍♂️",
	"🚶",
	"🚷",
	"🚸",
	"🚹",
	"🚺",
	"🚻",
	"🚼",
	"🚽",
	"🚾",
	"🚿",
	"🛀🏻",
	"🛀🏼",
	"🛀🏽",
	"🛀🏾",
	"🛀🏿",
	"🛀",
	"🛁",
	"🛂",
	"🛃",
	"🛄",
	"🛅",
	"🛋️",
	"🛌🏻",
	"🛌🏼",
	"🛌🏽",
	"🛌🏾",
	"🛌🏿",
	"🛌",
	"🛍️",
	"🛎️",
	"🛏️",
	"🛐",
	"🛑",
	"🛒",
	"🛕",
	"🛠️",
	"🛡️",
	"🛢️",
	"🛣️",
	"🛤️",
	"🛥️",
	"🛩️",
	"🛫",
	"🛬",
	"🛰️",
	"🛳️",
	"🛴",
	"🛵",
	"🛶",
	"🛷",
	"🛸",
	"🛹",
	"🛺",
	"🟠",
	"🟡",
	"🟢",
	"🟣",
	"🟤",
	"🟥",
	"🟦",
	"🟧",
	"🟨",
	"🟩",
	"🟪",
	"🟫",
	"🤍",
	"🤎",
	"🤏🏻",
	"🤏🏼",
	"🤏🏽",
	"🤏🏾",
	"🤏🏿",
	"🤏",
	"🤐",
	"🤑",
	"🤒",
	"🤓",
	"🤔",
	"🤕",
	"🤖",
	"🤗",
	"🤘🏻",
	"🤘🏼",
	"🤘🏽",
	"🤘🏾",
	"🤘🏿",
	"🤘",
	"🤙🏻",
	"🤙🏼",
	"🤙🏽",
	"🤙🏾",
	"🤙🏿",
	"🤙",
	"🤚🏻",
	"🤚🏼",
	"🤚🏽",
	"🤚🏾",
	"🤚🏿",
	"🤚",
	"🤛🏻",
	"🤛🏼",
	"🤛🏽",
	"🤛🏾",
	"🤛🏿",
	"🤛",
	"🤜🏻",
	"🤜🏼",
	"🤜🏽",
	"🤜🏾",
	"🤜🏿",
	"🤜",
	"🤝",
	"🤞🏻",
	"🤞🏼",
	"🤞🏽",
	"🤞🏾",
	"🤞🏿",
	"🤞",
	"🤟🏻",
	"🤟🏼",
	"🤟🏽",
	"🤟🏾",
	"🤟🏿",
	"🤟",
	"🤠",
	"🤡",
	"🤢",
	"🤣",
	"🤤",
	"🤥",
	"🤦🏻‍♀️",
	"🤦🏻‍♂️",
	"🤦🏻",
	"🤦🏼‍♀️",
	"🤦🏼‍♂️",
	"🤦🏼",
	"🤦🏽‍♀️",
	"🤦🏽‍♂️",
	"🤦🏽",
	"🤦🏾‍♀️",
	"🤦🏾‍♂️",
	"🤦🏾",
	"🤦🏿‍♀️",
	"🤦🏿‍♂️",
	"🤦🏿",
	"🤦‍♀️",
	"🤦‍♂️",
	"🤦",
	"🤧",
	"🤨",
	"🤩",
	"🤪",
	"🤫",
	"🤬",
	"🤭",
	"🤮",
	"🤯",
	"🤰🏻",
	"🤰🏼",
	"🤰🏽",
	"🤰🏾",
	"🤰🏿",
	"🤰",
	"🤱🏻",
	"🤱🏼",
	"🤱🏽",
	"🤱🏾",
	"🤱🏿",
	"🤱",
	"🤲🏻",
	"🤲🏼",
	"🤲🏽",
	"🤲🏾",
	"🤲🏿",
	"🤲",
	"🤳🏻",
	"🤳🏼",
	"🤳🏽",
	"🤳🏾",
	"🤳🏿",
	"🤳",
	"🤴🏻",
	"🤴🏼",
	"🤴🏽",
	"🤴🏾",
	"🤴🏿",
	"🤴",
	"🤵🏻‍♀️",
	"🤵🏻‍♂️",
	"🤵🏻",
	"🤵🏼‍♀️",
	"🤵🏼‍♂️",
	"🤵🏼",
	"🤵🏽‍♀️",
	"🤵🏽‍♂️",
	"🤵🏽",
	"🤵🏾‍♀️",
	"🤵🏾‍♂️",
	"🤵🏾",
	"🤵🏿‍♀️",
	"🤵🏿‍♂️",
	"🤵🏿",
	"🤵‍♀️",
	"🤵‍♂️",
	"🤵",
	"🤶🏻",
	"🤶🏼",
	"🤶🏽",
	"🤶🏾",
	"🤶🏿",
	"🤶",
	"🤷🏻‍♀️",
	"🤷🏻‍♂️",
	"🤷🏻",
	"🤷🏼‍♀️",
	"🤷🏼‍♂️",
	"🤷🏼",
	"🤷🏽‍♀️",
	"🤷🏽‍♂️",
	"🤷🏽",
	"🤷🏾‍♀️",
	"🤷🏾‍♂️",
	"🤷🏾",
	"🤷🏿‍♀️",
	"🤷🏿‍♂️",
	"🤷🏿",
	"🤷‍♀️",
	"🤷‍♂️",
	"🤷",
	"🤸🏻‍♀️",
	"🤸🏻‍♂️",
	"🤸🏻",
	"🤸🏼‍♀️",
	"🤸🏼‍♂️",
	"🤸🏼",
	"🤸🏽‍♀️",
	"🤸🏽‍♂️",
	"🤸🏽",
	"🤸🏾‍♀️",
	"🤸🏾‍♂️",
	"🤸🏾",
	"🤸🏿‍♀️",
	"🤸🏿‍♂️",
	"🤸🏿",
	"🤸‍♀️",
	"🤸‍♂️",
	"🤸",
	"🤹🏻‍♀️",
	"🤹🏻‍♂️",
	"🤹🏻",
	"🤹🏼‍♀️",
	"🤹🏼‍♂️",
	"🤹🏼",
	"🤹🏽‍♀️",
	"🤹🏽‍♂️",
	"🤹🏽",
	"🤹🏾‍♀️",
	"🤹🏾‍♂️",
	"🤹🏾",
	"🤹🏿‍♀️",
	"🤹🏿‍♂️",
	"🤹🏿",
	"🤹‍♀️",
	"🤹‍♂️",
	"🤹",
	"🤺",
	"🤼‍♀️",
	"🤼‍♂️",
	"🤼",
	"🤽🏻‍♀️",
	"🤽🏻‍♂️",
	"🤽🏻",
	"🤽🏼‍♀️",
	"🤽🏼‍♂️",
	"🤽🏼",
	"🤽🏽‍♀️",
	"🤽🏽‍♂️",
	"🤽🏽",
	"🤽🏾‍♀️",
	"🤽🏾‍♂️",
	"🤽🏾",
	"🤽🏿‍♀️",
	"🤽🏿‍♂️",
	"🤽🏿",
	"🤽‍♀️",
	"🤽‍♂️",
	"🤽",
	"🤾🏻‍♀️",
	"🤾🏻‍♂️",
	"🤾🏻",
	"🤾🏼‍♀️",
	"🤾🏼‍♂️",
	"🤾🏼",
	"🤾🏽‍♀️",
	"🤾🏽‍♂️",
	"🤾🏽",
	"🤾🏾‍♀️",
	"🤾🏾‍♂️",
	"🤾🏾",
	"🤾🏿‍♀️",
	"🤾🏿‍♂️",
	"🤾🏿",
	"🤾‍♀️",
	"🤾‍♂️",
	"🤾",
	"🤿",
	"🥀",
	"🥁",
	"🥂",
	"🥃",
	"🥄",
	"🥅",
	"🥇",
	"🥈",
	"🥉",
	"🥊",
	"🥋",
	"🥌",
	"🥍",
	"🥎",
	"🥏",
	"🥐",
	"🥑",
	"🥒",
	"🥓",
	"🥔",
	"🥕",
	"🥖",
	"🥗",
	"🥘",
	"🥙",
	"🥚",
	"🥛",
	"🥜",
	"🥝",
	"🥞",
	"🥟",
	"🥠",
	"🥡",
	"🥢",
	"🥣",
	"🥤",
	"🥥",
	"🥦",
	"🥧",
	"🥨",
	"🥩",
	"🥪",
	"🥫",
	"🥬",
	"🥭",
	"🥮",
	"🥯",
	"🥰",
	"🥱",
	"🥳",
	"🥴",
	"🥵",
	"🥶",
	"🥺",
	"🥻",
	"🥼",
	"🥽",
	"🥾",
	"🥿",
	"🦀",
	"🦁",
	"🦂",
	"🦃",
	"🦄",
	"🦅",
	"🦆",
	"🦇",
	"🦈",
	"🦉",
	"🦊",
	"🦋",
	"🦌",
	"🦍",
	"🦎",
	"🦏",
	"🦐",
	"🦑",
	"🦒",
	"🦓",
	"🦔",
	"🦕",
	"🦖",
	"🦗",
	"🦘",
	"🦙",
	"🦚",
	"🦛",
	"🦜",
	"🦝",
	"🦞",
	"🦟",
	"🦠",
	"🦡",
	"🦢",
	"🦥",
	"🦦",
	"🦧",
	"🦨",
	"🦩",
	"🦪",
	"🦮",
	"🦯",
	"🦰",
	"🦱",
	"🦲",
	"🦳",
	"🦴",
	"🦵🏻",
	"🦵🏼",
	"🦵🏽",
	"🦵🏾",
	"🦵🏿",
	"🦵",
	"🦶🏻",
	"🦶🏼",
	"🦶🏽",
	"🦶🏾",
	"🦶🏿",
	"🦶",
	"🦷",
	"🦸🏻‍♀️",
	"🦸🏻‍♂️",
	"🦸🏻",
	"🦸🏼‍♀️",
	"🦸🏼‍♂️",
	"🦸🏼",
	"🦸🏽‍♀️",
	"🦸🏽‍♂️",
	"🦸🏽",
	"🦸🏾‍♀️",
	"🦸🏾‍♂️",
	"🦸🏾",
	"🦸🏿‍♀️",
	"🦸🏿‍♂️",
	"🦸🏿",
	"🦸‍♀️",
	"🦸‍♂️",
	"🦸",
	"🦹🏻‍♀️",
	"🦹🏻‍♂️",
	"🦹🏻",
	"🦹🏼‍♀️",
	"🦹🏼‍♂️",
	"🦹🏼",
	"🦹🏽‍♀️",
	"🦹🏽‍♂️",
	"🦹🏽",
	"🦹🏾‍♀️",
	"🦹🏾‍♂️",
	"🦹🏾",
	"🦹🏿‍♀️",
	"🦹🏿‍♂️",
	"🦹🏿",
	"🦹‍♀️",
	"🦹‍♂️",
	"🦹",
	"🦺",
	"🦻🏻",
	"🦻🏼",
	"🦻🏽",
	"🦻🏾",
	"🦻🏿",
	"🦻",
	"🦼",
	"🦽",
	"🦾",
	"🦿",
	"🧀",
	"🧁",
	"🧂",
	"🧃",
	"🧄",
	"🧅",
	"🧆",
	"🧇",
	"🧈",
	"🧉",
	"🧊",
	"🧍🏻‍♀️",
	"🧍🏻‍♂️",
	"🧍🏻",
	"🧍🏼‍♀️",
	"🧍🏼‍♂️",
	"🧍🏼",
	"🧍🏽‍♀️",
	"🧍🏽‍♂️",
	"🧍🏽",
	"🧍🏾‍♀️",
	"🧍🏾‍♂️",
	"🧍🏾",
	"🧍🏿‍♀️",
	"🧍🏿‍♂️",
	"🧍🏿",
	"🧍‍♀️",
	"🧍‍♂️",
	"🧍",
	"🧎🏻‍♀️",
	"🧎🏻‍♂️",
	"🧎🏻",
	"🧎🏼‍♀️",
	"🧎🏼‍♂️",
	"🧎🏼",
	"🧎🏽‍♀️",
	"🧎🏽‍♂️",
	"🧎🏽",
	"🧎🏾‍♀️",
	"🧎🏾‍♂️",
	"🧎🏾",
	"🧎🏿‍♀️",
	"🧎🏿‍♂️",
	"🧎🏿",
	"🧎‍♀️",
	"🧎‍♂️",
	"🧎",
	"🧏🏻‍♀️",
	"🧏🏻‍♂️",
	"🧏🏻",
	"🧏🏼‍♀️",
	"🧏🏼‍♂️",
	"🧏🏼",
	"🧏🏽‍♀️",
	"🧏🏽‍♂️",
	"🧏🏽",
	"🧏🏾‍♀️",
	"🧏🏾‍♂️",
	"🧏🏾",
	"🧏🏿‍♀️",
	"🧏🏿‍♂️",
	"🧏🏿",
	"🧏‍♀️",
	"🧏‍♂️",
	"🧏",
	"🧐",
	"🧑🏻‍🤝‍🧑🏻",
	"🧑🏻",
	"🧑🏼‍🤝‍🧑🏻",
	"🧑🏼‍🤝‍🧑🏼",
	"🧑🏼",
	"🧑🏽‍🤝‍🧑🏻",
	"🧑🏽‍🤝‍🧑🏼",
	"🧑🏽‍🤝‍🧑🏽",
	"🧑🏽",
	"🧑🏾‍🤝‍🧑🏻",
	"🧑🏾‍🤝‍🧑🏼",
	"🧑🏾‍🤝‍🧑🏽",
	"🧑🏾‍🤝‍🧑🏾",
	"🧑🏾",
	"🧑🏿‍🤝‍🧑🏻",
	"🧑🏿‍🤝‍🧑🏼",
	"🧑🏿‍🤝‍🧑🏽",
	"🧑🏿‍🤝‍🧑🏾",
	"🧑🏿‍🤝‍🧑🏿",
	"🧑🏿",
	"🧑‍🤝‍🧑",
	"🧑",
	"🧒🏻",
	"🧒🏼",
	"🧒🏽",
	"🧒🏾",
	"🧒🏿",
	"🧒",
	"🧓🏻",
	"🧓🏼",
	"🧓🏽",
	"🧓🏾",
	"🧓🏿",
	"🧓",
	"🧔🏻",
	"🧔🏼",
	"🧔🏽",
	"🧔🏾",
	"🧔🏿",
	"🧔",
	"🧕🏻",
	"🧕🏼",
	"🧕🏽",
	"🧕🏾",
	"🧕🏿",
	"🧕",
	"🧖🏻‍♀️",
	"🧖🏻‍♂️",
	"🧖🏻",
	"🧖🏼‍♀️",
	"🧖🏼‍♂️",
	"🧖🏼",
	"🧖🏽‍♀️",
	"🧖🏽‍♂️",
	"🧖🏽",
	"🧖🏾‍♀️",
	"🧖🏾‍♂️",
	"🧖🏾",
	"🧖🏿‍♀️",
	"🧖🏿‍♂️",
	"🧖🏿",
	"🧖‍♀️",
	"🧖‍♂️",
	"🧖",
	"🧗🏻‍♀️",
	"🧗🏻‍♂️",
	"🧗🏻",
	"🧗🏼‍♀️",
	"🧗🏼‍♂️",
	"🧗🏼",
	"🧗🏽‍♀️",
	"🧗🏽‍♂️",
	"🧗🏽",
	"🧗🏾‍♀️",
	"🧗🏾‍♂️",
	"🧗🏾",
	"🧗🏿‍♀️",
	"🧗🏿‍♂️",
	"🧗🏿",
	"🧗‍♀️",
	"🧗‍♂️",
	"🧗",
	"🧘🏻‍♀️",
	"🧘🏻‍♂️",
	"🧘🏻",
	"🧘🏼‍♀️",
	"🧘🏼‍♂️",
	"🧘🏼",
	"🧘🏽‍♀️",
	"🧘🏽‍♂️",
	"🧘🏽",
	"🧘🏾‍♀️",
	"🧘🏾‍♂️",
	"🧘🏾",
	"🧘🏿‍♀️",
	"🧘🏿‍♂️",
	"🧘🏿",
	"🧘‍♀️",
	"🧘‍♂️",
	"🧘",
	"🧙🏻‍♀️",
	"🧙🏻‍♂️",
	"🧙🏻",
	"🧙🏼‍♀️",
	"🧙🏼‍♂️",
	"🧙🏼",
	"🧙🏽‍♀️",
	"🧙🏽‍♂️",
	"🧙🏽",
	"🧙🏾‍♀️",
	"🧙🏾‍♂️",
	"🧙🏾",
	"🧙🏿‍♀️",
	"🧙🏿‍♂️",
	"🧙🏿",
	"🧙‍♀️",
	"🧙‍♂️",
	"🧙",
	"🧚🏻‍♀️",
	"🧚🏻‍♂️",
	"🧚🏻",
	"🧚🏼‍♀️",
	"🧚🏼‍♂️",
	"🧚🏼",
	"🧚🏽‍♀️",
	"🧚🏽‍♂️",
	"🧚🏽",
	"🧚🏾‍♀️",
	"🧚🏾‍♂️",
	"🧚🏾",
	"🧚🏿‍♀️",
	"🧚🏿‍♂️",
	"🧚🏿",
	"🧚‍♀️",
	"🧚‍♂️",
	"🧚",
	"🧛🏻‍♀️",
	"🧛🏻‍♂️",
	"🧛🏻",
	"🧛🏼‍♀️",
	"🧛🏼‍♂️",
	"🧛🏼",
	"🧛🏽‍♀️",
	"🧛🏽‍♂️",
	"🧛🏽",
	"🧛🏾‍♀️",
	"🧛🏾‍♂️",
	"🧛🏾",
	"🧛🏿‍♀️",
	"🧛🏿‍♂️",
	"🧛🏿",
	"🧛‍♀️",
	"🧛‍♂️",
	"🧛",
	"🧜🏻‍♀️",
	"🧜🏻‍♂️",
	"🧜🏻",
	"🧜🏼‍♀️",
	"🧜🏼‍♂️",
	"🧜🏼",
	"🧜🏽‍♀️",
	"🧜🏽‍♂️",
	"🧜🏽",
	"🧜🏾‍♀️",
	"🧜🏾‍♂️",
	"🧜🏾",
	"🧜🏿‍♀️",
	"🧜🏿‍♂️",
	"🧜🏿",
	"🧜‍♀️",
	"🧜‍♂️",
	"🧜",
	"🧝🏻‍♀️",
	"🧝🏻‍♂️",
	"🧝🏻",
	"🧝🏼‍♀️",
	"🧝🏼‍♂️",
	"🧝🏼",
	"🧝🏽‍♀️",
	"🧝🏽‍♂️",
	"🧝🏽",
	"🧝🏾‍♀️",
	"🧝🏾‍♂️",
	"🧝🏾",
	"🧝🏿‍♀️",
	"🧝🏿‍♂️",
	"🧝🏿",
	"🧝‍♀️",
	"🧝‍♂️",
	"🧝",
	"🧞‍♀️",
	"🧞‍♂️",
	"🧞",
	"🧟‍♀️",
	"🧟‍♂️",
	"🧟",
	"🧠",
	"🧡",
	"🧢",
	"🧣",
	"🧤",
	"🧥",
	"🧦",
	"🧧",
	"🧨",
	"🧩",
	"🧪",
	"🧫",
	"🧬",
	"🧭",
	"🧮",
	"🧯",
	"🧰",
	"🧱",
	"🧲",
	"🧳",
	"🧴",
	"🧵",
	"🧶",
	"🧷",
	"🧸",
	"🧹",
	"🧺",
	"🧻",
	"🧼",
	"🧽",
	"🧾",
	"🧿",
	"🩰",
	"🩱",
	"🩲",
	"🩳",
	"🩸",
	"🩹",
	"🩺",
	"🪀",
	"🪁",
	"🪂",
	"🪐",
	"🪑",
	"🪒",
	"🪓",
	"🪔",
	"🪕",
	"‼️",
	"⁉️",
	"™️",
	"ℹ️",
	"↔️",
	"↕️",
	"↖️",
	"↗️",
	"↘️",
	"↙️",
	"↩️",
	"↪️",
	"#⃣",
	"⌚️",
	"⌛️",
	"⌨️",
	"⏏️",
	"⏩",
	"⏪",
	"⏫",
	"⏬",
	"⏭️",
	"⏮️",
	"⏯️",
	"⏰",
	"⏱️",
	"⏲️",
	"⏳",
	"⏸️",
	"⏹️",
	"⏺️",
	"Ⓜ️",
	"▪️",
	"▫️",
	"▶️",
	"◀️",
	"◻️",
	"◼️",
	"◽️",
	"◾️",
	"☀️",
	"☁️",
	"☂️",
	"☃️",
	"☄️",
	"☎️",
	"☑️",
	"☔️",
	"☕️",
	"☘️",
	"☝🏻",
	"☝🏼",
	"☝🏽",
	"☝🏾",
	"☝🏿",
	"☝️",
	"☠️",
	"☢️",
	"☣️",
	"☦️",
	"☪️",
	"☮️",
	"☯️",
	"☸️",
	"☹️",
	"☺️",
	"♀️",
	"♂️",
	"♈️",
	"♉️",
	"♊️",
	"♋️",
	"♌️",
	"♍️",
	"♎️",
	"♏️",
	"♐️",
	"♑️",
	"♒️",
	"♓️",
	"♟️",
	"♠️",
	"♣️",
	"♥️",
	"♦️",
	"♨️",
	"♻️",
	"♾",
	"♿️",
	"⚒️",
	"⚓️",
	"⚔️",
	"⚕️",
	"⚖️",
	"⚗️",
	"⚙️",
	"⚛️",
	"⚜️",
	"⚠️",
	"⚡️",
	"⚪️",
	"⚫️",
	"⚰️",
	"⚱️",
	"⚽️",
	"⚾️",
	"⛄️",
	"⛅️",
	"⛈️",
	"⛎",
	"⛏️",
	"⛑️",
	"⛓️",
	"⛔️",
	"⛩️",
	"⛪️",
	"⛰️",
	"⛱️",
	"⛲️",
	"⛳️",
	"⛴️",
	"⛵️",
	"⛷🏻",
	"⛷🏼",
	"⛷🏽",
	"⛷🏾",
	"⛷🏿",
	"⛷️",
	"⛸️",
	"⛹🏻‍♀️",
	"⛹🏻‍♂️",
	"⛹🏻",
	"⛹🏼‍♀️",
	"⛹🏼‍♂️",
	"⛹🏼",
	"⛹🏽‍♀️",
	"⛹🏽‍♂️",
	"⛹🏽",
	"⛹🏾‍♀️",
	"⛹🏾‍♂️",
	"⛹🏾",
	"⛹🏿‍♀️",
	"⛹🏿‍♂️",
	"⛹🏿",
	"⛹️‍♀️",
	"⛹️‍♂️",
	"⛹️",
	"⛺️",
	"⛽️",
	"✂️",
	"✅",
	"✈️",
	"✉️",
	"✊🏻",
	"✊🏼",
	"✊🏽",
	"✊🏾",
	"✊🏿",
	"✊",
	"✋🏻",
	"✋🏼",
	"✋🏽",
	"✋🏾",
	"✋🏿",
	"✋",
	"✌🏻",
	"✌🏼",
	"✌🏽",
	"✌🏾",
	"✌🏿",
	"✌️",
	"✍🏻",
	"✍🏼",
	"✍🏽",
	"✍🏾",
	"✍🏿",
	"✍️",
	"✏️",
	"✒️",
	"✔️",
	"✖️",
	"✝️",
	"✡️",
	"✨",
	"✳️",
	"✴️",
	"❄️",
	"❇️",
	"❌",
	"❎",
	"❓",
	"❔",
	"❕",
	"❗️",
	"❣️",
	"❤️",
	"➕",
	"➖",
	"➗",
	"➡️",
	"➰",
	"➿",
	"⤴️",
	"⤵️",
	"*⃣",
	"⬅️",
	"⬆️",
	"⬇️",
	"⬛️",
	"⬜️",
	"⭐️",
	"⭕️",
	"0⃣",
	"〰️",
	"〽️",
	"1⃣",
	"2⃣",
	"㊗️",
	"㊙️",
	"3⃣",
	"4⃣",
	"5⃣",
	"6⃣",
	"7⃣",
	"8⃣",
	"9⃣",
	"©️",
	"®️",
	""
];

class StandardEmoji {

	static emojis = EMOJIS;

	static isStaticEmoji(item) {
		if (typeof item !== typeof "") return false;
		return StandardEmoji.emojis.includes(item);
	}

	static getEmojis() {
		return EMOJIS;
	}
}


export default StandardEmoji;