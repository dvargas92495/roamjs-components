# roamjs-components
    
This is a collection of common UI components used by RoamJS extensions and services made available to make development easier for other Roam developers.

### createConfigObserver({title, config})

This is an observer that will render the `ConfigPage` UI on the page of your choosing.

* `title: string` Name of the page to render the Configuration page ui. If this page doesn't already exist in the user's Roam database, one will be created with specified default values filled in.
* `config: object` The metadata specifying which fields your configuration supports
    * `tabs: object[]` The first level tabs grouping your fields. They map to first level blocks on the Roam Page.
        * `id: string` The name of the tab to use in both the Roam UI and in the tab label. The `home` id inserts blocks at the top level of Roam.
        * `toggleable: boolean` Whether this tab should be able to turn on and off. Turning a tab off disables the rest of the nested fields.
        * `fields: object[]` The set of field metadata grouped in this tab.
            * `title: string` The name of the field, displayed on the nested tag and in the Roam block.
            * `description: string` The description of the field with renders next to each field label as a tooltip.
            * `type: string` The field type, with only the following valid values:
                * `text` Renders a text input.
                * `number` Renders a number input.
                * `flag` Renders a boolean checkbox.
                * `multitext` Renders a text input that could have multiple child values. Used for an array of string values.
                * `pages` Similar to multitext, but all values are Roam pages.
                * `oauth` Renders a login button based on the service provider
            * `defaultValue` The default value filled in on page creation. Field is optional and type based on type above
