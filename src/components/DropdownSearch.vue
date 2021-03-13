<template>
    <div>
        <input
            type="text"
            ref="inputElement"
            class="w-full p-2 rounded border focus:border focus:border-blue-300"
            v-model="searchText"
            @focus="inFocus = true"
            @blur="inFocus = false"
            @change.stop
        />
        <div class="relative w-full">
            <div
                v-show="inFocus"
                class="absolute z-50 rounded bg-gray-100 p-0 w-full"
            >
                <div
                    class="border rounded w-full p-2 cursor-pointer hover:bg-gray-200"
                    v-for="option in displayedOptions"
                    :key="option"
                    @mousedown.prevent
                    @mouseup="updateChoice(option)"
                >
                    {{ option.display }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue"

export interface SelectOption {
    value: any
    display: string
}

export default defineComponent({
    name: "DropdownSearch",
    props: {
        options: {
            type: Array as PropType<SelectOption[]>,
            default: [] as string[],
        },

        modelValue: {
            type: Object as PropType<any | null>,
            default: null,
        },
        maxVisibleOptions: {
            type: Number,
            default: 10,
        },
    },
    setup(props, context) {
        const chosenOption = ref<SelectOption | null>(null)
        const searchText = ref<string>("")
        const inputElement = ref<HTMLInputElement | null>(null)
        const displayedOptions = computed(() =>
            props.options
                .filter(({ display }) => {
                    return display
                        .toLowerCase()
                        .includes(searchText.value.toLowerCase())
                })
                .slice(0, props.maxVisibleOptions)
        )
        const inFocus = ref<boolean>(false)
        watch(
            () => props.modelValue,
            (val) => {
                chosenOption.value = val
            }
        )
        watch(chosenOption, (val) => {
            context.emit("update:modelValue", val)
            context.emit("change", val)
        })

        function updateChoice(option: SelectOption) {
            chosenOption.value = option.value
            searchText.value = option.display
            inputElement.value?.blur()
        }

        return {
            chosenOption,
            searchText,
            displayedOptions,
            inFocus,
            updateChoice,
            inputElement,
        }
    },
})
</script>
