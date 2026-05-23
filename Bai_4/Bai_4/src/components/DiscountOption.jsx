import {
    Card,
    TextField,
    Select,
    Button,
    Text,
    Box,
    BlockStack,
    InlineGrid,
    InlineStack,
    Divider,
} from "@shopify/polaris";

import { Controller } from "react-hook-form";
import { DeleteIcon } from "@shopify/polaris-icons";

export default function DiscountOption({
    index,
    control,
    watch,
    errors,
    remove,
    canDelete,
}) {
    const discountType = watch(
        `options.${index}.discountType`
    );

    return (

        <BlockStack gap="0">
            {/* Header */}

            <Box
                background="bg-surface"
                borderEndEndRadius="200"
            >
                <div
                    style={{
                        background: "#F15A29",
                        color: "#fff",
                        padding: "6px 16px",
                        borderBottomRightRadius: "8px",
                        display: "inline-block",
                        fontWeight: 600,
                        fontSize: "12px",
                    }}
                >
                    OPTION {index + 1}
                </div>
            </Box>

            <InlineStack align="end">
                <div
                    style={{
                        transform: "scale(1.4)",
                        transformOrigin: "center",
                        cursor: "pointer",
                        marginRight: 14,
                    }}
                >
                    <Button
                        icon={DeleteIcon}
                        variant="plain"
                        accessibilityLabel="Delete option"
                        disabled={!canDelete}
                        onClick={() => remove(index)}
                    />
                </div>
            </InlineStack>


            <Box padding="400">
                <BlockStack gap="400">
                    <InlineGrid
                        columns={{
                            xs: 1,
                            sm: 3,
                        }}
                        gap="400"
                    >
                        <Controller
                            name={`options.${index}.title`}
                            control={control}
                            rules={{
                                required: "Title is required",
                            }}
                            render={({ field }) => (
                                <TextField
                                    label="Title"
                                    autoComplete="off"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    error={
                                        errors.options?.[index]?.title
                                            ?.message
                                    }
                                />
                            )}
                        />

                        <Controller
                            name={`options.${index}.subtitle`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Subtitle"
                                    autoComplete="off"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Controller
                            name={`options.${index}.label`}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Label (optional)"
                                    autoComplete="off"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </InlineGrid>

                    <InlineGrid
                        columns={{
                            xs: 1,
                            sm: 3,
                        }}
                        gap="400"
                    >
                        <Controller
                            name={`options.${index}.quantity`}
                            control={control}
                            rules={{
                                required: "Quantity required",
                                pattern: {
                                    value: /^\d+$/,
                                    message: "Number only",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    autoComplete="off"
                                    value={String(
                                        field.value ?? ""
                                    )}
                                    onChange={(value) =>
                                        field.onChange(
                                            Number(value)
                                        )
                                    }
                                    error={
                                        errors.options?.[index]
                                            ?.quantity?.message
                                    }
                                />
                            )}
                        />

                        <Controller
                            name={`options.${index}.discountType`}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    label="Discount Type"
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={[
                                        {
                                            label: "None",
                                            value: "none",
                                        },
                                        {
                                            label: "% Discount",
                                            value: "percent",
                                        },
                                        {
                                            label: "Discount / each",
                                            value: "fixed",
                                        },
                                    ]}
                                />
                            )}
                        />

                        <Box>
                            {discountType !== "none" && (
                                <Controller
                                    name={`options.${index}.amount`}
                                    control={control}
                                    rules={{
                                        required:
                                            "Amount required",
                                        pattern: {
                                            value: /^\d+$/,
                                            message:
                                                "Number only",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            label="Amount"
                                            type="number"
                                            autoComplete="off"
                                            value={String(
                                                field.value ?? ""
                                            )}
                                            onChange={(value) =>
                                                field.onChange(
                                                    Number(value)
                                                )
                                            }
                                            suffix={
                                                discountType ===
                                                    "percent"
                                                    ? "%"
                                                    : "$"
                                            }
                                            error={
                                                errors.options?.[
                                                    index
                                                ]?.amount
                                                    ?.message
                                            }
                                        />
                                    )}
                                />
                            )}
                        </Box>
                    </InlineGrid>
                </BlockStack>
            </Box>
        </BlockStack>

    );
}