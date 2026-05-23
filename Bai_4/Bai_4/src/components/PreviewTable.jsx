import {
    Card,
    BlockStack,
    Text,
    DataTable,
} from "@shopify/polaris";

export default function PreviewTable({
    options = [],
    title,
    description,
}) {
    return (
        <Card>
            <BlockStack gap="300">
                <Text
                    
                    variant="headingSm"
                    as="h3"
                >
                    Preview
                </Text>
                <Text
                    alignment="center"
                    variant="headingSm"
                    as="h3"
                >
                    {title}
                </Text>

                <Text

                    variant="bodySm"
                    tone="subdued"
                    as="p"
                >
                    {description}
                </Text>

                <DataTable
                    columnContentTypes={[
                        "text",
                        "text",
                        "numeric",
                        "numeric",
                    ]}
                    headings={[
                        "Title",
                        "Discount Type",
                        "Quantity",
                        "Amount",
                    ]}
                    rows={options.map((item) => [
                        item.title,
                        item.discountType === "none"
                            ? "None"
                            : item.discountType === "percent"
                                ? "%discount"
                                : "Discount/each",
                        item.quantity,
                        item.discountType === "percent"
                            ? `${item.amount}%`
                            : item.discountType === "fixed"
                                ? `$${item.amount}`
                                : "",
                    ])}
                />
            </BlockStack>
        </Card>
    );
}