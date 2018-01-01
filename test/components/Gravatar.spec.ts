import expect from "expect"
import Vue from "vue"
import { shallow } from "vue-test-utils"

import Gravatar from "@/components/Gravatar.vue"

describe("Gravatar", () => {
  it("Mounts without errors", done => {
    const wrapper = shallow(Gravatar)

    done()
  })
})
