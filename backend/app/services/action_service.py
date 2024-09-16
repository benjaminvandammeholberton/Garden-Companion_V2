"""
ActionService module for handling CRUD operations on Action objects.
"""

import os
from uuid import UUID

from app.schemas.vegetable_manager_schema import VegetableManagerCreate
from fastapi import File, UploadFile

from app.models.action_model import Action
from app.models.user_model import User
from app.schemas.action_schema import (
    ActionCreate, ActionType, ActionUpdate, SowingActionCreate, PlantingActionCreate
)
from app.services.vegetable_manager_service import VegetableManagerService


class ActionService:
    @staticmethod
    async def list_actions(user: User) -> list[Action]:
        """
        Retrieve a list of actions for a given user
        """
        actions = await Action.find(
            Action.owner == user.user_id
        ).to_list()
        for action in actions:
            vegetable = await VegetableManagerService.retrieve_vegetable(user, action.vegetable)
            action.vegetable = vegetable
        return actions

    @staticmethod
    async def create_action(user: User, data: SowingActionCreate | PlantingActionCreate):

        new_vegetable_data = VegetableManagerCreate(
            area=data.area,
            name=data.name,
            variety=data.variety,
            quantity=data.quantity,
            quantity_unit=data.quantity_unit,
        )
        if data.type == ActionType.sowing:
            new_vegetable_data.sowing_date = data.sowing_date
        if data.type == ActionType.planting:
            new_vegetable_data.planting_date = data.planting_date
            
        new_vegetable = await VegetableManagerService.create_vegetable(user, new_vegetable_data)
        
        action_data = ActionCreate(
            type=data.type,
            note=data.note,
            vegetable=new_vegetable.vegetable_manager_id,
            area=data.area,
            photo=data.file_path
        )
        action = Action(**action_data.model_dump(), owner=user.user_id)
        await action.create()
        return new_vegetable

    @staticmethod
    async def retrieve_action(
        current_user: User,
        action_id: UUID,
        with_vegetable_details: bool = True
    ) -> Action | None:
        """
        Retrieve a specific action for the current user
        """
        action = await Action.find_one(Action.action_id == action_id,
                                       Action.owner == current_user.user_id)
        return action

    @staticmethod
    async def update_action(
        current_user: User, action_id: UUID, data: ActionUpdate
    ) -> Action | None:
        """
        Update a action for the current user
        """
        action = await ActionService.retrieve_action(current_user, action_id)
        if action:
            await action.update({"$set": data.model_dump(exclude_unset=True)})
            await action.save()
        return action

    @staticmethod
    async def delete_action(current_user: User, action_id: UUID) -> None:
        """
        Delete a action for the current user
        """
        action = await ActionService.retrieve_action(current_user, action_id)
        if action:
            await action.delete()
        return None
