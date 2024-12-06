from django.db import models
from . import BaseModel

# r: Read
# w: Write
# x: Execute


# utils
def check_permissions(pattern: str):
    return


class PermissionGroupChoice(models.TextChoices):
    OWNER = "owner", "Owner"
    GROUP = "owner", "Group"
    OTHER = "owner", "Other"


class Permissions(BaseModel):
    # class PermissionLevelChoices(models.TextChoices):
    #     "read"
    #     "write"
    #     "delete"

    granted_by = models.ForeignKey()
    user = models.ForeignKey()
    permission_level = models.CharField(max_length=99)
    permission_groups = models.CharField()


class File(BaseModel):
    file_name = models.CharField()
    file_size = models.FloatField()
    owner = models.CharField()
    ...


class ShareLink(BaseModel):
    link = models.CharField(max_length=100)
    file = models.CharField(max_length=100)
    permission = models.CharField(max_length=100)
    expires_at = models.DateTimeField(auto_now=True)
    token = models.CharField(max_length=100)


# CREATE TABLE shared_links (
#     link_id INT PRIMARY KEY AUTO_INCREMENT,
#     file_id INT NOT NULL,
#     token VARCHAR(255) NOT NULL UNIQUE, -- Unique token for the shared link
#     can_view BOOLEAN DEFAULT TRUE,
#     can_edit BOOLEAN DEFAULT FALSE,
#     expires_at TIMESTAMP NULL, -- NULL for no expiration
#     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#     FOREIGN KEY (file_id) REFERENCES files(file_id)
# );

# permissions table:

# permission_id (PK, UUID)
# file_id/folder_id (FK to files or folders table)
# user_id (FK to users table)
# permission_level (ENUM: 'owner', 'editor', 'viewer')
# granted_by (FK    to users table)
# created_at
# updated_at
