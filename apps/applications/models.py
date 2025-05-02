from django.db import models

class Application(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2)
    user_id = models.BigIntegerField()
    quantity = models.BigIntegerField()
    is_complete = models.BooleanField(default=False)
    # определить поля для кол-ва эл qn is_complete  и типы данных, виды полей и их значения.
    class Meta:
        app_label = 'car_marketplace'
