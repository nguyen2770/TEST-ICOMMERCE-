import {
    Card,
    BlockStack,
    Text,
    TextField,
} from "@shopify/polaris";

import { Controller } from "react-hook-form";

export default function GeneralSection({
    control,
    errors,
}) {
    return (
        <Card>
            <BlockStack gap="400">
                <Text variant="headingSm" as="h3">
                    General
                </Text>

                <Controller
                    name="campaign"
                    control={control}
                    rules={{
                        required: "Campaign is required",
                    }}
                    render={({ field }) => (
                        <TextField
                            label="Campaign"
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="off"
                            error={errors.campaign?.message}
                        />
                    )}
                />

                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="Title"
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="off"
                        />
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="Description"
                            value={field.value}
                            onChange={field.onChange}
                            autoComplete="off"
                        />
                    )}
                />
            </BlockStack>
        </Card>
    );
}