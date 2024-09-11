"""
"""

from datetime import date, datetime
from enum import Enum
from uuid import UUID
from pydantic import BaseModel

from app.schemas.area_schema import AreaOut
from app.schemas.vegetable_manager_schema import VegetableManagerOut


class ActionType(str, Enum):
    sowing = "Semer"
    planting = "Planter"
    removing = "Fin de culture"
    harvesting = "Récolter"
    watering = "Arroser"
    fertilizing = "Fertiliser"
    treating = "Traîter"
    weeding = "Désherber"
    mulching = "Pailler"
    creating = "Création"


class SowingActionCreate(BaseModel):
    type: ActionType
    area: UUID
    name: str
    quantity: int
    quantity_unit: str
    note: str | None = None
    sowing_date: date


class ActionCreate(BaseModel):
    action_id: UUID
    type: ActionType
    note: str | None = None
    vegetable: UUID | None = None
    area: UUID | None = None
    # photo: str | None = None


class ActionOut(BaseModel):
    action_id: UUID
    type: ActionType
    note: str | None = None
    vegetable: list[VegetableManagerOut] | None = None
    area: AreaOut | None = None
    created_at: datetime
    updated_at: datetime
    photo: str | None = None


class ActionUpdate(BaseModel):
    type: ActionType | None = None
    vegetable:  UUID | None = None
    area:  UUID | None = None
    note:  str | None = None
    photo:  str | None = None
