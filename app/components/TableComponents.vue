<script lang="ts">
import faker from "faker"
import Vue from "vue"

import CripBootstrap, { Paging } from "@/main"
import CodeSample from "./CodeSample.vue"
import ExampleSection from "./ExampleSection.vue"

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  city: string
  work: string
  [key: string]: string | number
}

function user(id: number): User {
  return {
    id,

    city: faker.address.city(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    work: faker.company.companyName(),
  }
}

export default Vue.extend({
  name: "TableComponents",

  components: { ExampleSection, CodeSample },

  data() {
    const arr = Array.from(Array(100).keys())
    const items = arr.reduce<User[]>((acc, val, i) => {
      acc.push(user(i + 1))
      return acc
    }, [])
    return {
      items,
      paging: new Paging<User>(this, { route: { name: "table" }, perPage: 10 }),
    }
  },

  methods: {
    fetchPage() {
      this.items.sort(this.compare)
      const perPage = this.paging.perPage
      const start = this.paging.page * perPage - perPage
      const items = this.items.slice(start, start + perPage)
      this.paging.update({
        items,
        lastPage: 100 / perPage,
      })
    },

    compare(a: any, b: any) {
      const sort = this.paging.sort
      let comparison = 0

      if (a[sort] > b[sort]) {
        comparison = 1
      } else if (b[sort] > a[sort]) {
        comparison = -1
      }

      if (this.paging.direction === "desc" && a[sort] !== b[sort]) {
        return comparison > 0 ? -1 : 1
      }

      return comparison
    },

    change() {
      // tslint:disable-next-line:no-console
      console.log("Change event")
    },
  },

  created() {
    this.paging.init(() => this.fetchPage())
  },
})
</script>

<template>
  <div>
    <example-section title="Router table">
      <c-row>
        <c-col>
          <p>
            Router table stores pagination data in a url and on any change in a url or click
            to element will fetch new data.
          </p>
        </c-col>
      </c-row>
      <c-row>
        <c-col>
          <c-grid :paging="paging"
                  type="info">
            <span slot="title">All parameters stored in a url</span>

            <table class="table">
              <thead>
                <tr>
                  <c-grid-header :paging="paging"
                                 column="firstName"
                                 @change="change">
                    First name
                  </c-grid-header>
                  <c-grid-header :paging="paging"
                                 column="lastName">
                    Last Name
                  </c-grid-header>
                  <c-grid-header :paging="paging"
                                 column="email">
                    Email
                  </c-grid-header>
                  <c-grid-header :paging="paging"
                                 column="city">
                    City
                  </c-grid-header>
                  <c-grid-header :paging="paging"
                                 column="work">
                    Work
                  </c-grid-header>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in paging.items"
                    :key="user.id"
                    :class="paging.classes(user)">
                  <td>{{ user.firstName }} </td>
                  <td>{{ user.lastName }} </td>
                  <td>{{ user.email }} </td>
                  <td>{{ user.city }} </td>
                  <td>{{ user.work }} </td>
                </tr>
              </tbody>
            </table>
          </c-grid>
        </c-col>
      </c-row>

      <code-sample>
        import Vue from "vue"
        import CripBootstrap, { Nav } from "crip-vue-bootstrap"

        Vue.use(CripBootstrap)

        Vue.extend({
          template: `
            &lt;crip-navbar :left="left"
                         class="navbar-default navbar-static-top"&gt;
              &lt;span class="navbar-brand">Brand&lt;/span&gt;
            &lt;/crip-navbar&gt;
          `,

          data() {
            return {

            }
          }
        })
      </code-sample>
    </example-section>
  </div>
</template>
