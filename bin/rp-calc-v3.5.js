// Declarations
let ss_amount = 0
let hd_amount = 0
let disc_amount_hd = 0
let disc_amount_ss = 0
let hd_plan_override = false

// Price constants
// help desk plans
const HD_STARTER_MONTHLY = 29
const HD_REGULAR_MONTHLY = 49
const HD_PRO_MONTHLY = 99
const HD_STARTER_ANNUAL = 24
const HD_REGULAR_ANNUAL = 40
const HD_PRO_ANNUAL = 80

// self service plans
const SS_STARTER_MONTHLY = 100
const SS_REGULAR_MONTHLY = 300
const SS_PRO_MONTHLY = 600
const SS_STARTER_ANNUAL = 80
const SS_REGULAR_ANNUAL = 250
const SS_PRO_ANNUAL = 500

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
  orders_slider.setAttribute("onchange", "calcSSPrice()")

  sel_helpdesk_plan.setAttribute("onchange", "setHelpDeskOverrride()")
  agents_slider.setAttribute("onchange", "calcHDPrice()")
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
  console.log("cb_pay_annually - change")
  setElementVisibility()
  calcHDPrice()
  calcSSPrice()
  // updateAmountSpan()
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
  // spans -> ss-amount, hd-amount, total-amount
  span_helpdesk_price_val.textContent = hd_amount.toLocaleString()
  span_selfservice_price_val.textContent = ss_amount.toLocaleString()

  let totalAmount = ss_amount + hd_amount

  if (cb_pay_annually.checked) {
    // span_discount_price_val.textContent = (totalAmount * 0.2).toLocaleString()
    // span_total_price_val.textContent = (totalAmount * 0.8).toLocaleString()
    console.log("cb_pay_annually - checked")
    span_discount_price_val.textContent = (
      disc_amount_hd + disc_amount_ss
    ).toLocaleString()
    span_total_price_val.textContent = totalAmount.toLocaleString()

    // // TODO: Update to static pricing on annual payment
    /* 
      Helpdesk Starter: $29/u/mo or $24/u/mo (billed annually)
      Helpdesk Regular: $49/u/mo or $40/u/mo (billed annually)
      Helpdesk Pro: $80/u/mo or $99/u/mo (billed annually)
      ---
      Self Service Starter: $100/mo or $80/mo (billed annually)
      Self Service Regular: $300/mo or $250/mo (billed annually)
      Self Service Pro: $600/mo or $500/mo (billed annually)
    */
  } else {
    span_total_price_val.textContent = totalAmount.toLocaleString()
  }

  if (sel_helpdesk_plan.value === "enterprise" || num_orders.value >= 10000) {
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

  if (agents_slider.value >= 0 && agents_slider.value <= 5) {
    sel_helpdesk_plan.value = "starter"
  }
  if (agents_slider.value > 5 && agents_slider.value <= 15) {
    sel_helpdesk_plan.value = "regular"
  }
  if (agents_slider.value > 15) {
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

  if (sel_helpdesk_plan.value === "starter") {
    if (!cb_pay_annually.checked) {
      hd_amount = num_agents.value * HD_STARTER_MONTHLY
      disc_amount_hd = 0
    } else {
      hd_amount = num_agents.value * HD_STARTER_ANNUAL
      disc_amount_hd =
        num_agents.value * (HD_STARTER_MONTHLY - HD_STARTER_ANNUAL)
    }
  }
  if (sel_helpdesk_plan.value === "regular") {
    if (!cb_pay_annually.checked) {
      hd_amount = num_agents.value * HD_REGULAR_MONTHLY
      disc_amount_hd = 0
    } else {
      hd_amount = num_agents.value * HD_REGULAR_ANNUAL
      disc_amount_hd =
        num_agents.value * (HD_REGULAR_MONTHLY - HD_REGULAR_ANNUAL)
    }
  }
  if (sel_helpdesk_plan.value === "pro") {
    if (!cb_pay_annually.checked) {
      hd_amount = num_agents.value * HD_PRO_MONTHLY
      disc_amount_hd = 0
    } else {
      hd_amount = num_agents.value * HD_PRO_ANNUAL
      disc_amount_hd = num_agents.value * (HD_PRO_MONTHLY - HD_PRO_ANNUAL)
    }
  }
  if (sel_helpdesk_plan.value === "enterprise") {
    hd_amount = 0
    text_hd_price.style.display = "none"
    label_hd_custom_price.style.display = "flex"
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

  if (num_orders.value <= 0) {
    // No plan selected, Edge case, unused normally
    ss_amount = 0
    disc_amount_ss = 0
  }
  if (num_orders.value > 0 && num_orders.value <= 1000) {
    // Starter Plan
    // ss_amount = cb_pay_annually.checked ? SS_STARTER_ANNUAL : SS_STARTER_MONTHLY
    if (!cb_pay_annually.checked) {
      ss_amount = SS_STARTER_MONTHLY
      disc_amount_ss = 0
    } else {
      ss_amount = SS_STARTER_ANNUAL
      disc_amount_ss = SS_STARTER_MONTHLY - SS_STARTER_ANNUAL
    }
  }
  if (num_orders.value > 1000 && num_orders.value <= 3500) {
    // Regular Plan
    // ss_amount = cb_pay_annually.checked ? SS_REGULAR_ANNUAL : SS_REGULAR_MONTHLY
    if (!cb_pay_annually.checked) {
      ss_amount = SS_REGULAR_MONTHLY
      disc_amount_ss = 0
    } else {
      ss_amount = SS_REGULAR_ANNUAL
      disc_amount_ss = SS_REGULAR_MONTHLY - SS_REGULAR_ANNUAL
    }
  }
  if (num_orders.value > 3500 && num_orders.value < 10000) {
    // Pro Plan
    // ss_amount = cb_pay_annually.checked ? SS_PRO_ANNUAL : SS_PRO_MONTHLY
    if (!cb_pay_annually.checked) {
      ss_amount = SS_PRO_MONTHLY
      disc_amount_ss = 0
    } else {
      ss_amount = SS_PRO_ANNUAL
      disc_amount_ss = SS_PRO_MONTHLY - SS_PRO_ANNUAL
    }
  }
  if (num_orders.value >= 10000) {
    ss_amount = 0
    text_ss_price.style.display = "none"
    label_ss_custom_price.style.display = "flex"
  }

  updateAmountSpan()
}
