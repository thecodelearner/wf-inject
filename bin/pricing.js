//console.log("loaded codesandbox_forked");
let activeTab = "helpdesk";
let activeTerm = "monthly";

// Switch button triggers
const hd_btns = document.querySelectorAll('[data-tabs-btn="tab_b-hd"]');
const cp_btns = document.querySelectorAll('[data-tabs-btn="tab_b-cp"]');
const termCb = document.getElementById("term-cb-switch");

// Switch tabs triggers mobile
const hd_mobile = document.querySelector('[data-w-tab="Help desk"]');
const cp_mobile = document.querySelector('[data-w-tab="Customer portal"]');
const nv_trig = document.querySelector("#nv-t");

// Switch content
const base_amt_span = document.querySelectorAll('[data-amt-span="base"]');
const base_span = document.querySelectorAll('[data-span="base"]');
const pro_amt_span = document.querySelectorAll('[data-amt-span="pro"]');
const promax_amt_span = document.querySelectorAll('[data-amt-span="promax"]');

// price subtext spans
const base_subtext = document.querySelectorAll('[data-subtext="base"]');
const pro_subtext = document.querySelectorAll('[data-subtext="pro"]');
const promax_subtext = document.querySelectorAll('[data-subtext="promax"]');

// plan description para spans
const product_para = document.querySelectorAll('[data-para="product"]');
const product_para_m = document.querySelectorAll('[data-para="product_m"]');
const base_para = document.querySelectorAll('[data-para="base"]');
const pro_para = document.querySelectorAll('[data-para="pro"]');
const promax_para = document.querySelectorAll('[data-para="promax"]');

function handleTabSwitch(sw_btn) {
  // reset shadows
  hd_btns.forEach((btn) => {
    btn.style["boxShadow"] = "";
  });
  cp_btns.forEach((btn) => {
    btn.style["boxShadow"] = "";
  });

  // product switch
  if (sw_btn.text.includes("Help Desk")) {
    // set active tab
    activeTab = "helpdesk";

    hd_btns.forEach((btn) => {
      btn.style["boxShadow"] = "0px 4px 14px 0px rgba(0, 0, 0, 0.12)";
    });

    if (termCb.checked) {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "9";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "60";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "120";
      });
    } else {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "9";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "50";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "100";
      });
    }

    base_subtext.forEach((price) => {
      price.innerHTML = "for 3 agents/month";
    });
    pro_subtext.forEach((price) => {
      price.innerHTML = "per agent/month";
    });
    promax_subtext.forEach((price) => {
      price.innerHTML = "per agent/month";
    });

    product_para.forEach((para) => {
      para.innerHTML = "AI-powered Support Inbox";
    });

    base_para.forEach((para) => {
      para.innerHTML =
        'Alternative to <strong class="bold-text">Shopify Inbox.</strong><br><span class="span-top-mg">Manage Email, Social and Chat from one app.</span>';
    });

    pro_para.forEach((para) => {
      para.innerHTML =
        'Alternative to <strong class="bold-text">___.</strong><br><span class="span-top-mg">All features, automations &amp; AI with a fair price.</span>';
    });

    promax_para.forEach((para) => {
      para.innerHTML =
        'Alternative to <strong class="bold-text">Zendesk.</strong><br><span class="span-top-mg">Powerful platform, is easy &amp; has great support.</span>';
    });

    showStickyWrapper();
  } else {
    // set active tab
    activeTab = "customerportal";
    cp_btns.forEach((btn) => {
      btn.style["boxShadow"] = "0px 4px 14px 0px rgba(0, 0, 0, 0.12)";
    });

    if (termCb.checked) {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "0";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "100";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "300";
      });
    } else {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "0";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "120";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "360";
      });
    }

    base_subtext.forEach((price) => {
      price.innerHTML = "Free add-on&nbsp;<br>&nbsp;";
    });
    pro_subtext.forEach((price) => {
      price.innerHTML = "/month";
    });
    promax_subtext.forEach((price) => {
      price.innerHTML = "/month";
    });

    product_para.forEach((para) => {
      para.innerHTML =
        "Automate upto 50% of your inquires. Add-on to your Help Desk plan.";
    });

    base_para.forEach((para) => {
      para.innerHTML =
        'Alternative to <strong class="bold-text">FAQ&nbsp;Apps.</strong><br><span class="span-top-mg">With order tracking.<br></span>';
    });

    pro_para.forEach((para) => {
      para.innerHTML =
        'Alternative to <strong class="bold-text">Gorgias.</strong><br><span class="span-top-mg">Unlimited resolutions.</span>';
    });

    promax_para.forEach((para) => {
      para.innerHTML =
        'Alternative to <strong class="bold-text">Chatbots.</strong><br><span class="span-top-mg">Easier to use with multiple languages.</span>';
    });

    showStickyWrapper();
  }
}

// Switch triggers
hd_btns.forEach((btn) => {
  btn.addEventListener(
    "click",
    (cb = () => {
      handleTabSwitch(btn);
    })
  );
});

cp_btns.forEach((btn) => {
  btn.addEventListener(
    "click",
    (cb = () => {
      handleTabSwitch(btn);
    })
  );
});

termCb.addEventListener(
  "change",
  (cb = () => {
    handleTermChange();
  })
);

// Add default tab button shadows on page load
document.addEventListener(
  "DOMContentLoaded",
  function () {
    hd_btns[0].style["boxShadow"] = "0px 4px 14px 0px rgba(0, 0, 0, 0.12)";
    hd_btns[1].style["boxShadow"] = "0px 4px 14px 0px rgba(0, 0, 0, 0.12)";
  },
  false
);

function handleTermChange() {
  if (activeTab == "helpdesk") {
    if (termCb.checked) {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "9";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "50";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "100";
      });
    } else {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "9";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "60";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "120";
      });
    }
  }

  if (activeTab == "customerportal") {
    if (termCb.checked) {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "0";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "100";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "300";
      });
    } else {
      base_amt_span.forEach((amt) => {
        amt.innerHTML = "0";
      });
      pro_amt_span.forEach((amt) => {
        amt.innerHTML = "120";
      });
      promax_amt_span.forEach((amt) => {
        amt.innerHTML = "360";
      });
    }
  }
}

// Sticky interactions
const stickyWrapper = document.getElementById("sticky-pricing-wrapper");
const heightOffset = 335;

function showStickyWrapper() {
  const tabcCpHeight = document.getElementById("tabc-cp").offsetHeight;
  const tabcHdHeight = document.getElementById("tabc-hd").offsetHeight;
  const tabcHeight = tabcCpHeight + tabcHdHeight;

  if (
    document.documentElement.scrollTop >= 280 &&
    document.documentElement.scrollTop <= heightOffset + tabcHeight
  ) {
    stickyWrapper.style.display = "block";
    stickyWrapper.style.position = "fixed";
    stickyWrapper.style.opacity = "100";
    //console.log("scrolled >=192")
  } else if (document.documentElement.scrollTop <= 279) {
    stickyWrapper.style.display = "none";
    stickyWrapper.style.opacity = "0";
    //console.log("---scrolled <=382")
  } else if (
    document.documentElement.scrollTop >=
    heightOffset + tabcHeight + 1
  ) {
    stickyWrapper.style.display = "none";
    stickyWrapper.style.opacity = "0";
    //console.log("---scrolled >=3100");
  }
}

window.addEventListener(
  "scroll",
  function () {
    showStickyWrapper();
  },
  false
);
document.addEventListener("DOMContentLoaded", function () {
  showStickyWrapper();
});

document
  .getElementById("pricing-page-wrapper")
  .setAttribute("onscroll", showStickyWrapper());

