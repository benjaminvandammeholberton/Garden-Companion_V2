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
    treating = "Traiter"
    weeding = "Désherber"
    observation = "Observation"
    creating = "Création"


class ActionCreate(BaseModel):
    type: ActionType
    note: str | None = None
    vegetable: UUID | None = None
    area: UUID | None = None
    photo: str | None = None
    date: date
    name: str | None = None
    quantity: int | None = None
    quantity_unit: str | None = None
    variety: str | None = None
    sowing_date: date | None = None
    harvest_quantity: float | None = None
    harvest_unit: str | None = None
    watering_quantity: int | None = None
    watering_unit: str | None = None
    fertilizer_name: str | None = None
    fertilizer_quantity: float | None = None
    fertilizer_unit: str | None = None
    treatment_name: str | None = None
    treatment_quantity: float | None = None
    treatment_unit: str | None = None


class ActionOut(BaseModel):
    action_id: UUID
    type: ActionType
    note: str | None = None
    vegetable: VegetableManagerOut | None = None
    area: AreaOut | None = None
    created_at: datetime
    updated_at: datetime
    photo: str | None = None
    date: date
    harvest_quantity: float | None = None
    harvest_unit: str | None = None
    watering_quantity: int | None = None
    watering_unit: str | None = None
    fertilizer_name: str | None = None
    fertilizer_quantity: float | None = None
    fertilizer_unit: str | None = None
    treatment_name: str | None = None
    treatment_quantity: float | None = None
    treatment_unit: str | None = None


class ActionUpdate(BaseModel):
    type: ActionType | None = None
    vegetable:  UUID | None = None
    area:  UUID | None = None
    note:  str | None = None
    photo:  str | None = None
