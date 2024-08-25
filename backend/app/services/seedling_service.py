"""
SeedlingService module for handling CRUD operations on seedling objects.
"""

from typing import List
from uuid import UUID

from fastapi import HTTPException

from app.models.seedling_model import Seedling
from app.models.user_model import User
from app.schemas.seedling_schema import (
    SeedlingCreate, SeedlingOut, SeedlingUpdate
)


class SeedlingService:
    @staticmethod
    async def list_seedlings(user: User) -> List[SeedlingOut]:
        """
        Retrieve a list of seedlings for a given user.

        :param user: The user for whom to retrieve seedlings.
        :return: List of seedlings.
        """
        seedlings = await Seedling.find(
            Seedling.owner == user.user_id).to_list()
        return seedlings

    @staticmethod
    async def create_seedling(user: User, data: SeedlingCreate) -> SeedlingOut:
        """
        Create a new Seedling for the given user.

        :param user: The user creating the Seedling.
        :param data: Seedling creation data.
        :return: Created Seedling.
        """
        seedling = Seedling(**data.model_dump(), owner=user.user_id)
        return await seedling.create()

    @staticmethod
    async def retrieve_seedling(current_user: User, seedling_id: UUID):
        """
        Retrieve a specific Seedling for the current user.

        :param current_user: The current user.
        :param seedling_id: ID of the Seedling to retrieve.
        :return: Retrieved Seedling.
        """
        seedling = await Seedling.find_one(
            Seedling.seedling_id == seedling_id,
            Seedling.owner == current_user.user_id
        )
        if seedling is None:
            raise HTTPException(status_code=404, detail="Seedling not found")
        return seedling

    @staticmethod
    async def update_seedling(
            current_user: User, seedling_id: UUID, data: SeedlingUpdate):
        """
        Update a Seedling for the current user.

        :param current_user: The current user.
        :param seedling_id: ID of the Seedling to update.
        :param data: Seedling update data.
        :return: Updated Seedling.
        """
        seedling = await SeedlingService.retrieve_seedling(
            current_user, seedling_id)
        await seedling.update({"$set": data.model_dump(exclude_unset=True)})
        await seedling.save()
        return seedling

    @staticmethod
    async def delete_seedling(current_user: User, seedling_id: UUID):
        """
        Delete a Seedling for the current user.

        :param current_user: The current user.
        :param seedling_id: ID of the Seedling to delete.
        :return: None
        """
        seedling = await SeedlingService.retrieve_seedling(
            current_user, seedling_id)
        if seedling:
            await seedling.delete()
        return None
