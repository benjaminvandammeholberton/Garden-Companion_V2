from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field


class SeedlingCreate(BaseModel):
    """
    """
    name: str = Field(max_length=55, min_length=1)
    variety: str = Field(max_length=55, min_length=1)
    quantity: int = Field(gt=0, lt=9999)


class SeedlingUpdate(BaseModel):
    """
    """
    name: str | None = Field(None, max_length=55, min_length=1)
    variety: str | None = Field(None, max_length=55, min_length=1)
    quantity: int | None = Field(None, gt=0, lt=9999)


class SeedlingOut(BaseModel):
    """
    """
    seedling_id: UUID
    created_at: datetime
    updated_at: datetime
    name: str
    variety: str
    quantity: int
    owner: UUID
