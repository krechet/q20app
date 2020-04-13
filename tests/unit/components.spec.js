import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import QuestionItem from '@/components/QuestionItem.vue'

const localVue = createLocalVue()

localVue.use(Vuex)



describe('QuestionItem.vue', () => {

  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        messages: {
          state: {
            role: 'player'
          }
        }
      }
    })
  })


  it('renders question when passed', () => {
      const question = 'Test question'
      const wrapper = shallowMount(QuestionItem, {
        store,
        localVue,
      propsData: { item: {
        type: 'question',
        text: question
      } }
    })
    expect(wrapper.text()).to.include(question)
  })
})
