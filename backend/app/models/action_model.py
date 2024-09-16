from uuid import UUID, uuid4

from pydantic import Field
from app.schemas.action_schema import ActionType
from beanie import Document
from datetime import datetime


class Action(Document):
    """
    """
    action_id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    type: ActionType
    note: str = Field(None, max_length=500)
    vegetable: UUID | None = None
    area: UUID | None = None
    photo: str | None = None
    owner: UUID

    class Settings:
        """
        Settings class for the Area model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "actions"
