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
    date: datetime
    type: ActionType
    watering_quantity: float | None = None
    watering_unit: str | None = None
    harvest_quantity: float | None = None
    harvest_unit: str | None = None
    fertilizer_name: str | None = None
    fertilizer_quantity: float | None = None
    fertilizer_unit: str | None = None
    treatment_name: str | None = None
    treatment_quantity: float | None = None
    treatment_unit: str | None = None
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
