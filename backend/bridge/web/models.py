# models.py
from django.db import models
from django.db.models import JSONField
from django.contrib.postgres.fields import ArrayField  # 如果使用 PostgreSQL
from django.contrib.auth.models import User

class Agency(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    photo_name = models.CharField(max_length=200, blank=True, null=True)
    base64 = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'agency'


class AuthAgencyUsers(models.Model):
    agency = models.ForeignKey(Agency, models.DO_NOTHING)
    user = models.ForeignKey(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_agency_users'
        unique_together = (('agency', 'user'),)
        db_table_comment = '使用者隸屬於哪個單位'