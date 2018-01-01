import expect from "expect"
import Vue, { CreateElement } from "vue"
import { shallow } from "vue-test-utils"

import Alert from "@/components/Alert.vue"
import { ComponentOptions } from "vue/types/options"

describe("Alert", () => {
  describe("Simple usage", () => {
    const wrapper = shallow(Alert, {
      slots: { default: "Default slot content" },
    })

    it("Renders alert element with passed content", () => {
      expect(wrapper.text()).toContain("Default slot content")
    })

    it("Hides alert after click on close button", () => {
      wrapper.find(".close").trigger("click")

      expect(wrapper.text()).toBe("")
    })
  })

  describe("Validates properties", () => {
    const wrapper = shallow(Alert)
    const props: any = wrapper.vm.$options.props
    const type = props["type"]

    expect(type.required).toBeFalsy()
    expect(type.type).toBe(String)
    expect(type.validator && type.validator("fail")).toBeFalsy()
    expect(type.validator && type.validator("success")).toBeTruthy()
  })

  describe("Passing isVisible prop", () => {
    const wrapper = shallow(Alert, {
      slots: { default: "Default slot content" },
      propsData: { isVisible: false },
    })

    it("Should render empty element", () => {
      expect(wrapper.text()).toBe("")
    })

    it("Should show up when isVisible becomes true", () => {
      wrapper.setProps({ isVisible: true })
      expect(wrapper.text()).toContain("Default slot content")
    })

    it("Should hide when isVisible becomes false", () => {
      wrapper.setProps({ isVisible: false })
      expect(wrapper.text()).toBe("")
    })

    it("Should mutate prop when close button clicked", () => {
      wrapper.setProps({ isVisible: true })
      wrapper.find(".close").trigger("click")
      expect(wrapper.emitted()["update:isVisible"]).toBeTruthy()
      expect(wrapper.emitted()["update:isVisible"].length).toBe(1)
      expect(wrapper.emitted()["update:isVisible"][0]).toEqual([false])

      expect(wrapper.emitted().hide).toBeTruthy()
    })
  })

  describe("Passing type prop", () => {
    const wrapper = shallow(Alert, {
      slots: { default: "Default slot content" },
      propsData: { type: "success" },
    })

    it("Should hide when isVisible becomes false", () => {
      expect(wrapper.text()).toContain("Default slot content")
      expect(wrapper.find(".alert").classes()).toContain("alert-success")
    })

    it("Should not render if receives invalid type value", () => {
      const wrapper2 = shallow(Alert, {
        slots: { default: "Default slot content" },
        propsData: { type: "fail" },
      })
      expect(wrapper2.text()).toBe("")
      expect(wrapper2.html()).toEqual(undefined)
    })
  })
})
