import expect from "expect"
import Vue from "vue"
import { mount } from "vue-test-utils"

import Gravatar from "@/components/Gravatar.vue"

const option = { key: "1", text: "one", value: 1 }

describe("Gravatar", () => {
  it("Mounts without errors", done => {
    const wrapper = mount(Gravatar)

    done()
  })
})
