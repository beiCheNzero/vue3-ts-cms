<template>
  <div class="ljl-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :show-password="item.type === 'password'"
                  :placeholder="item.placeholder"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
                <!-- v-model="formData[`${item.field}`]" -->
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option v-for="opt in item.options" :key="opt.value" :value="opt.value">
                    {{ opt.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'detepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => {}
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      /*
       * 在vue3和TS结合的时候
       * 如果默认值时一个数组或者对象的时候这里的默认值要写成一个函数，否则会报错
       */
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '20px 40px'
      })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    }
  },
  /*
   * 真正实现单项数据流的一个方案，实现了双向绑定
   */
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 第一种方式 (双向绑定的方式)
    // const formData = ref({ ...props.modelValue })

    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )

    // 第二种方式  (不使用双向绑定方式)
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      // formData,
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.ljl-form {
  padding-top: 22px;
}
</style>
