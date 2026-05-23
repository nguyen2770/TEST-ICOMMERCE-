import { Page, Layout, Card, Button, BlockStack, Text, Divider, Box, InlineStack } from "@shopify/polaris";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

import GeneralSection from "./components/GeneralSection";
import DiscountOption from "./components/DiscountOption";
import PreviewTable from "./components/PreviewTable";
import { PlusIcon } from "@shopify/polaris-icons";
import { createVolumeDiscount } from "./api";

export default function App() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaign: "Volume discount #2",
      title: "Buy more and save",
      description: "Apply for all products in store",

      options: [
        {
          title: "Single",
          subtitle: "Standard price",
          label: "",
          quantity: 1,
          discountType: "none",
          amount: "",
        },
        {
          title: "Duo",
          subtitle: "Save 10%",
          label: "Popular",
          quantity: 2,
          discountType: "percent",
          amount: 10,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const options = watch("options");

  const addOption = () => {
    const last = options[options.length - 1];

    append({
      title: "",
      subtitle: "",
      label: "",
      quantity: Number(last.quantity) + 1,
      discountType: "none",
      amount: "",
    });
  };

  const onSubmit = async (data) => {
    if (!data.campaign.trim()) {
      alert("Campaign is required");
      return;
    }

    if (!data.options.length) {
      alert("At least 1 option");
      return;
    }

    try {
      const result = await createVolumeDiscount(data);

      console.log(result);

      console.log(data);
      alert("Saved successfully");
    } catch {
      alert("Save failed");
    }
  };

  return (
    <Page
      title="Create volume discount"
      backAction={{
        onAction: () => navigate(-1),
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <GeneralSection
              control={control}
              errors={errors}
            />

            <Card padding="0">
              <BlockStack gap="0">
                <Box padding="400">
                  <Text variant="headingSm" as="h3">
                    Volume discount rule
                  </Text>
                </Box>

                <Box
                  background="border"
                  minHeight="4px"
                />

                <Box padding="0">
                  {fields.map((item, index) => (
                    <>
                      <DiscountOption
                        key={item.id}
                        index={index}
                        control={control}
                        watch={watch}
                        errors={errors}
                        remove={remove}
                        canDelete={fields.length > 1}
                      />

                      <Box
                        background="border"
                        minHeight="2px"
                      />


                    </>

                  ))}

                  <Divider />


                  <Box padding="400">
                    <button
                      type="button"
                      onClick={addOption}
                      style={{
                        width: "100%",
                        height: "36px",
                        background: "#F15A29",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      + Add option
                    </button>
                  </Box>

                </Box>
              </BlockStack>
            </Card>

            <InlineStack align="end">
              <Button
                variant="primary"
                size="large"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </InlineStack>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <PreviewTable
            options={options}
            title={watch("title")}
            description={watch("description")}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}