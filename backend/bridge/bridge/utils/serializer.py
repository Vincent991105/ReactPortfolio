from rest_framework import serializers

def get_partial_serializer(Serializer, *fields, ref_name=None):
    base_instance = Serializer()
    selected_fields = {
        field: base_instance.fields[field]
        for field in fields if field in base_instance.fields
    }
    meta_class = type('Meta', (), {
        'ref_name': ref_name or f"{Serializer.__name__}_{'_'.join(fields)}"
    })
    return type('PartialSerializer', (serializers.Serializer,), {
        **selected_fields,
        'Meta': meta_class,
    })
