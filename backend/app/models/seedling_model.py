from datetime import datetime
from uuid import UUID, uuid4

from beanie import Document
from pydantic import Field


class Seedling(Document):
    """
    """
    seedling_id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    name: str = Field(max_length=55, min_length=1)
    variety: str = Field(max_length=55, min_length=1)
    quantity: int = Field(gt=0, lt=9999)
    owner: UUID

    class Settings:
        """
        Settings class for the Area model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "seedlings"
