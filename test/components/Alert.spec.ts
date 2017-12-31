import expect from "expect"
import Vue from "vue"
import { mount } from "vue-test-utils"

import Alert from "@/components/Alert.vue"

const option = { key: "1", text: "one", value: 1 }

describe("Alert", () => {
  it("Mounts without errors", (done) => {
    const wrapper = mount(Alert, {
      propsData: { option, criteria: "" },
    })

    done()
  })
})
