// Declarations
let ss_amount = 0
let hd_amount = 0
let hd_plan_override = false

// getElements

// for Help Desk
const text_hd_price = document.getElementById("text-hd-price")
const span_helpdesk_price_val = document.getElementById("span--helpdesk-price")
const label_hd_custom_price = document.getElementById("label--hd-custom-price")
const num_agents = document.getElementById("num-agents-on-team")
const agents_slider = document.getElementById("agents-slider")
const sel_helpdesk_plan = document.getElementById("sel-help_desk-plan")

// for Self Serve
const text_ss_price = document.getElementById("text-ss-price")
const span_selfservice_price_val = document.getElementById(
  "span--self_service-price"
)
const label_ss_custom_price = document.getElementById("label--ss-custom-price")
const num_orders = document.getElementById("num-orders-per-month")
const orders_slider = document.getElementById("orders-slider")

// pricing
const cb_pay_annually = document.getElementById("cb-toggle-pay-annually")
const text_total_price = document.getElementById("text-total-price")
const span_total_price_val = document.getElementById("span--total-price-value")
const label_total_custom_price = document.getElementById(
  "label-total-custom-price"
)

// discount
const text_discount_price = document.getElementById("text-discount-price")
const span_discount_price_val = document.getElementById("span--discount-price")
const text_discount_none = document.getElementById("text-discount-none")

// hide-show wrappers
const wrapper_discount_div = document.getElementById("wrapper--discount-div")

// Initialize Webflow, then addEventListener for all dynamic elements
var Webflow = Webflow || []
Webflow.push(function () {
  // // TODO: Add Event Listener for all dynamic elements

  agents_slider.setAttribute("oninput", "sliderHandler(this.id, this.value)")

  num_agents.setAttribute("onchange", "updateSliderValue(this.id, this.value)")

  orders_slider.setAttribute("oninput", "sliderHandler(this.id, this.value)")

  num_orders.setAttribute("onchange", "updateSliderValue(this.id, this.value)")

  sel_helpdesk_plan.setAttribute("onchange", "setHelpDeskOverrride()")
  agents_slider.setAttribute("onchange", "calcHDPrice()")

  orders_slider.setAttribute("onchange", "calcSSPrice()")

  cb_pay_annually.setAttribute("onchange", "calcHDPrice()")
  cb_pay_annually.setAttribute("onchange", "calcSSPrice()")
})

function setHelpDeskOverrride() {
  hd_plan_override = true
  calcHDPrice()
}

function sliderHandler(sliderId, sliderValue) {
  if (sliderId !== "agents-slider" && sliderId !== "orders-slider") {
    return
  }

  updateNumericValue(sliderId, sliderValue)

  if (sliderId === "agents-slider") {
    if (hd_plan_override === false) {
      helpDeskPlanSliderOverride()
    }
    if (num_agents.value <= 100) {
      sel_helpdesk_plan.disabled = false
    }
    calcHDPrice()
  }
  if (sliderId === "orders-slider") {
    calcSSPrice()
  }
}

cb_pay_annually.addEventListener("change", (event) => {
  setElementVisibility()
  updateAmountSpan()
  // if (event.currentTarget.checked) {
  //   alert('checked');
  // } else {
  //   alert('not checked');
  // }
})

document.addEventListener("DOMContentLoaded", function () {
  // TODO: Run main calcMain() on page load to initialize the calculations and dynamic elements
})

function setElementVisibility() {
  // TODO: Show/Hide elements based on user input selections
  // 1. 20% discount wrapper on calculator output section
  // Show if pay annually is selected
  wrapper_discount_div.style.display = cb_pay_annually.checked ? "flex" : "none"
}

function updateAmountSpan() {
  // TODO: Update the amount span with the calculated amount
  // spans -> ss-amount, hd-amount, total-amount
  span_helpdesk_price_val.textContent = hd_amount.toLocaleString()
  span_selfservice_price_val.textContent = ss_amount.toLocaleString()

  //   let totalAmount = ss_amount + hd_amount

  //   if (cb_pay_annually.checked) {
  //     // TODO: Update with deferred annual amounts calculated individually within each calc function
  //     // span_discount_price_val.textContent = (totalAmount * 0.2).toLocaleString()
  //     // span_total_price_val.textContent = (totalAmount * 0.8).toLocaleString()

  //   } else {
  span_total_price_val.textContent = (ss_amount + hd_amount).toLocaleString()
  //   }

  if (sel_helpdesk_plan.value === "enterprise" || num_orders.value >= 501) {
    text_total_price.style.display = "none"
    label_total_custom_price.style.display = "flex"
    text_discount_price.style.display = "none"
    text_discount_none.style.display = "flex"
  }
}

function updateSliderValue(numId, numValue) {
  //  // TODO: Update the slider value when the number amount is changed

  if (numId !== "num-agents-on-team" && numId !== "num-orders-per-month") {
    return
  }

  if (numId === "num-agents-on-team") {
    agents_slider.value = numValue
    // setHelpDeskOverrride()
    helpDeskPlanSliderOverride()
    calcHDPrice()
  }

  if (numId === "num-orders-per-month") {
    orders_slider.value = numValue
    calcSSPrice()
  }
}

function updateNumericValue(sliderId, sliderValue) {
  // // TODO: Update the number value when the slider is changed

  if (sliderId !== "agents-slider" && sliderId !== "orders-slider") {
    return
  }

  if (sliderId === "agents-slider") {
    num_agents.value = sliderValue
    if (sliderValue >= 100) {
      num_agents.value = "100+"
      sel_helpdesk_plan.value = "enterprise"
      sel_helpdesk_plan.disabled = true
    }
  }
  if (sliderId === "orders-slider") {
    num_orders.value = sliderValue
  }
}

function helpDeskPlanSliderOverride() {
  if (hd_plan_override === true) {
    return
  }

  if (agents_slider.value >= 0 && agents_slider.value < 4) {
    sel_helpdesk_plan.value = "free"
  }
  if (agents_slider.value >= 4 && agents_slider.value < 20) {
    sel_helpdesk_plan.value = "starter"
  }
  if (agents_slider.value >= 20) {
    sel_helpdesk_plan.value = "pro"
  }
  if (agents_slider.value >= 100) {
    sel_helpdesk_plan.value = "enterprise"
  }

  calcHDPrice()
}

function calcHDPrice() {
  // // TODO: Calculate the Help Desk price based on the number of agents and Help Desk Plan selected

  // styles reset
  text_hd_price.style.display = "flex"
  label_hd_custom_price.style.display = "none"
  text_total_price.style.display = "flex"
  label_total_custom_price.style.display = "none"
  text_discount_price.style.display = "flex"
  text_discount_none.style.display = "none"

  if (!cb_pay_annually.checked) {
    if (sel_helpdesk_plan.value === "free") {
      hd_amount = num_agents.value * 0
    }

    if (sel_helpdesk_plan.value === "starter") {
      hd_amount = num_agents.value * 29
    }

    if (sel_helpdesk_plan.value === "pro") {
      hd_amount = num_agents.value * 99
    }
    if (sel_helpdesk_plan.value === "enterprise") {
      hd_amount = 0
      text_hd_price.style.display = "none"
      label_hd_custom_price.style.display = "flex"
    }
  }

  if (cb_pay_annually.checked) {
    if (sel_helpdesk_plan.value === "free") {
      hd_amount = num_agents.value * 0
    }

    if (sel_helpdesk_plan.value === "starter") {
      hd_amount = num_agents.value * 20
    }

    if (sel_helpdesk_plan.value === "pro") {
      hd_amount = num_agents.value * 85
    }
    if (sel_helpdesk_plan.value === "enterprise") {
      hd_amount = 0
      text_hd_price.style.display = "none"
      label_hd_custom_price.style.display = "flex"
    }
  }

  updateAmountSpan()
}

function calcSSPrice() {
  // TODO: Calculate the Self Serve price based on the number of orders per month.
  // Auto calculate SS Plan based on orders tier

  // styles reset
  text_ss_price.style.display = "flex"
  label_ss_custom_price.style.display = "none"
  text_total_price.style.display = "flex"
  label_total_custom_price.style.display = "none"
  text_discount_price.style.display = "flex"
  text_discount_none.style.display = "none"

  if (!cb_pay_annually.checked) {
    if (num_orders.value <= 0) {
      ss_amount = 0
    }
    if (num_orders.value > 0 && num_orders.value <= 50) {
      ss_amount = 0
    }
    if (num_orders.value > 50 && num_orders.value <= 500) {
      ss_amount = 50
    }
    if (num_orders.value >= 501) {
      ss_amount = 0
      text_ss_price.style.display = "none"
      label_ss_custom_price.style.display = "flex"
    }
  }

  if (cb_pay_annually.checked) {
    if (num_orders.value <= 0) {
      ss_amount = 0
    }
    if (num_orders.value > 0 && num_orders.value <= 50) {
      ss_amount = 0
    }
    if (num_orders.value > 50 && num_orders.value <= 500) {
      ss_amount = 42
    }
    if (num_orders.value >= 501) {
      ss_amount = 0
      text_ss_price.style.display = "none"
      label_ss_custom_price.style.display = "flex"
    }
  }

  updateAmountSpan()
}
