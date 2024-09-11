"""
ActionService module for handling CRUD operations on Action objects.
"""

import os
from uuid import UUID

from fastapi import File, UploadFile

from app.models.action_model import Action
from app.models.user_model import User
from app.schemas.action_schema import (
    ActionCreate, ActionUpdate, SowingActionCreate
)
from app.services.vegetable_manager_service import VegetableManagerService


UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


async def save_file(file: UploadFile) -> str:
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
        print(f"File saved to {file_path}")
        return file_path


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
    async def create_sowing_action(user: User, data: SowingActionCreate, file: UploadFile = File(None)):

        action = Action(**data.model_dump(), owner=user.user_id, photo=file)
        return await action.create()

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
