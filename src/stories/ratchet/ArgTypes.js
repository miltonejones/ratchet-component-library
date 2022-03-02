

const commonSizes = {
  size: {
    table: {
      category: "Appearance",
      subcategory: "Properties",
    },
    description: `The size of the avatar.`,
    defaultValue: 'small', 
    options: [
      "small",
      "medium",
      "large" 
    ],
    control: {
      type: "radio",
    },
  }
}

export const textHue = [
  "info" ,
  "success" ,
  "error" ,
  "warning"
];

const commonColors = {
  color: {
    table: {
      category: "Appearance",
      subcategory: "Properties",
    },
    description: `The color of the component.`,
    defaultValue: 'primary', 
    options: [
      "primary",
      "secondary",
      ...textHue
    ],
    control: {
      type: "radio",
    },
  }
}

const textColors = {
  color: {
    table: {
      category: "Appearance",
      subcategory: "Properties",
    },
    description: `The color of the component.`,
    defaultValue: 'info', 
    options: textHue,
    control: {
      type: "radio",
    },
  }
}

export const avatarVariants = ({
  variant: {
    table: {
      category: "Appearance",
      subcategory: "Properties",
    },
    description: `The shape of the avatar.`,
    defaultValue: 'circle', 
    options: [
      "circle",
      "rounded",
      "square" 
    ],
    control: {
      type: "radio",
    },
  },
  ...commonSizes
});

export const commonVariants = (options = [ "filled", "outlined" ], defaultValue = 'outlined') => ({
 variant: {
  table: {
    category: "Appearance",
    subcategory: "Properties",
  },
  description: `The variant to use.`,
  defaultValue,
  options ,
  control: {
    type: "radio",
  },
 },
 ...commonSizes,
 ...commonColors
});
   