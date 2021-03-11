<template>
    <div>
        <input
            type="text"
            ref="inputElement"
            class="w-full p-2 rounded border focus:border focus:border-blue-300"
            v-model="searchText"
            @focus="inFocus = true"
            @blur="inFocus = false"
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
                    {{ option }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue"

export default defineComponent({
    name: "DropdownSearch",
    props: {
        options: {
            type: Object as PropType<string[]>,
            default: [] as string[],
        },

        selectedOption: {
            type: String as PropType<string>,
            default: "",
        },
        maxVisibleOptions: {
            type: Number,
            default: 10,
        },
    },
    setup(props, context) {
        const value = ref<string>("")
        const searchText = ref<string>("")
        const inputElement = ref<HTMLInputElement | null>(null)
        const displayedOptions = computed(() =>
            props.options
                .filter((option) => {
                    return option.includes(searchText.value)
                })
                .slice(0, props.maxVisibleOptions)
        )
        const inFocus = ref<boolean>(false)
        watch(
            () => props.selectedOption,
            (val) => {
                value.value = val
            }
        )
        watch(value, (val) => {
            context.emit("update:selectedOption", val)
        })

        function updateChoice(option: string) {
            value.value = option
            searchText.value = option
            inputElement.value?.blur()
        }

        return {
            value,
            searchText,
            displayedOptions,
            inFocus,
            updateChoice,
            inputElement,
        }
    },
})
</script>
