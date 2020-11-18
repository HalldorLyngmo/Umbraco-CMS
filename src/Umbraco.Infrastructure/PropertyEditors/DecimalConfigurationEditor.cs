﻿using Umbraco.Core;
using Umbraco.Core.PropertyEditors;
using Umbraco.Core.PropertyEditors.Validators;

namespace Umbraco.Web.PropertyEditors
{
    /// <summary>
    /// A custom pre-value editor class to deal with the legacy way that the pre-value data is stored.
    /// </summary>
    internal class DecimalConfigurationEditor : ConfigurationEditor
    {
        public DecimalConfigurationEditor()
        {
            Fields.Add(new ConfigurationField(new DecimalValidator())
            {
                Description = "Enter the minimum amount of number to be entered",
                Key = "min",
                View = "decimal",
                Name = "Minimum"
            });

            Fields.Add(new ConfigurationField(new DecimalValidator())
            {
                Description = "Enter the intervals amount between each step of number to be entered",
                Key = "step",
                View = "decimal",
                Name = "Step Size"
            });

            Fields.Add(new ConfigurationField(new DecimalValidator())
            {
                Description = "Enter the maximum amount of number to be entered",
                Key = "max",
                View = "decimal",
                Name = "Maximum"
            });
        }
    }
}
