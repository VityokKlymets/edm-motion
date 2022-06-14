import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1626270862454 implements MigrationInterface {
    name = 'initial1626270862454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Genre" ("id" SERIAL NOT NULL, "string" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(50) NOT NULL, CONSTRAINT "PK_65ac2531fc74477bb7d8809e056" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Label" ("id" SERIAL NOT NULL, "string" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying(50) NOT NULL, CONSTRAINT "PK_197cce0fadf2870567c02ce1326" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Image" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, CONSTRAINT "PK_ddecd6b02f6dd0d3d10a0a74717" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "News" ("id" SERIAL NOT NULL, "string" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "title" character varying NOT NULL, "description" character varying, "releaseDate" TIMESTAMP, "isAttached" boolean NOT NULL DEFAULT false, "published" boolean NOT NULL DEFAULT false, "elapsedTime" character varying, "pictureId" integer, CONSTRAINT "REL_ccbfd7207639d508331b6dc2ab" UNIQUE ("pictureId"), CONSTRAINT "PK_109fa61fff0eb3997a2890f52c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Artist" ("id" SERIAL NOT NULL, CONSTRAINT "PK_7c07e38dd0d817a103966c5876e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Song" ("id" SERIAL NOT NULL, "string" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "title" character varying NOT NULL, "path" character varying NOT NULL, "isTelegramUpload" boolean NOT NULL DEFAULT false, "isPreview" boolean NOT NULL DEFAULT false, "listensCount" integer NOT NULL DEFAULT 0, "duration" integer NOT NULL, "url" character varying NOT NULL, "uniqueId" character varying, "waveform" double precision array NOT NULL, "coverId" integer, "playlistId" integer, "genreId" integer, CONSTRAINT "REL_a2a85a3929d15572a71654bcb5" UNIQUE ("coverId"), CONSTRAINT "PK_54faca34fbc52deb233dc658d2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "User_role_enum" AS ENUM('admin', 'editor', 'ghost')`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "string" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "User_role_enum" NOT NULL DEFAULT 'ghost', "playlistId" integer, CONSTRAINT "REL_2d90823b7e096e1fe2cc9b9d85" UNIQUE ("playlistId"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news_songs__song" ("newsId" integer NOT NULL, "songId" integer NOT NULL, CONSTRAINT "PK_6ad0eab6c2b1608884c4f2a67cf" PRIMARY KEY ("newsId", "songId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a188056e828471264ccbc4d378" ON "news_songs__song" ("newsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3795f3f39c1167fb621df65593" ON "news_songs__song" ("songId") `);
        await queryRunner.query(`CREATE TABLE "news_genres__genre" ("newsId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_8695a66ab368b8bbdee12294bff" PRIMARY KEY ("newsId", "genreId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_caad336d2cec35d144169f7085" ON "news_genres__genre" ("newsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1dfde3c2726e400844f152643e" ON "news_genres__genre" ("genreId") `);
        await queryRunner.query(`CREATE TABLE "news_labels__label" ("newsId" integer NOT NULL, "labelId" integer NOT NULL, CONSTRAINT "PK_6b4ccdf33d0e075f185e9d04a59" PRIMARY KEY ("newsId", "labelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed5600482a881eb8eb27cd4884" ON "news_labels__label" ("newsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e7f004946d4b5c1a97d593a04" ON "news_labels__label" ("labelId") `);
        await queryRunner.query(`CREATE TABLE "artist_songs__song" ("artistId" integer NOT NULL, "songId" integer NOT NULL, CONSTRAINT "PK_09b09e870cb80d202dc4a3390f7" PRIMARY KEY ("artistId", "songId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_33c43a3f3159f833d23c49706f" ON "artist_songs__song" ("artistId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b31d863747c97d73c38d75a049" ON "artist_songs__song" ("songId") `);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "string" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "textShort" character varying`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "staticPage" character varying`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "views" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD "pictureId" integer`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD CONSTRAINT "UQ_4db96de1624375bbbe21623ea1f" UNIQUE ("pictureId")`);
        await queryRunner.query(`ALTER TABLE "News" ADD CONSTRAINT "FK_ccbfd7207639d508331b6dc2abd" FOREIGN KEY ("pictureId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Song" ADD CONSTRAINT "FK_a2a85a3929d15572a71654bcb50" FOREIGN KEY ("coverId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Song" ADD CONSTRAINT "FK_d172260856811bfbe6e80753e33" FOREIGN KEY ("playlistId") REFERENCES "Artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Song" ADD CONSTRAINT "FK_ff0c94bb288735ee284c5b7a1b5" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Artist" ADD CONSTRAINT "FK_4db96de1624375bbbe21623ea1f" FOREIGN KEY ("pictureId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_2d90823b7e096e1fe2cc9b9d853" FOREIGN KEY ("playlistId") REFERENCES "Artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_songs__song" ADD CONSTRAINT "FK_a188056e828471264ccbc4d3783" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_songs__song" ADD CONSTRAINT "FK_3795f3f39c1167fb621df65593a" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_genres__genre" ADD CONSTRAINT "FK_caad336d2cec35d144169f70859" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_genres__genre" ADD CONSTRAINT "FK_1dfde3c2726e400844f152643ed" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_labels__label" ADD CONSTRAINT "FK_ed5600482a881eb8eb27cd48841" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news_labels__label" ADD CONSTRAINT "FK_4e7f004946d4b5c1a97d593a041" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_songs__song" ADD CONSTRAINT "FK_33c43a3f3159f833d23c49706f5" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artist_songs__song" ADD CONSTRAINT "FK_b31d863747c97d73c38d75a0498" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist_songs__song" DROP CONSTRAINT "FK_b31d863747c97d73c38d75a0498"`);
        await queryRunner.query(`ALTER TABLE "artist_songs__song" DROP CONSTRAINT "FK_33c43a3f3159f833d23c49706f5"`);
        await queryRunner.query(`ALTER TABLE "news_labels__label" DROP CONSTRAINT "FK_4e7f004946d4b5c1a97d593a041"`);
        await queryRunner.query(`ALTER TABLE "news_labels__label" DROP CONSTRAINT "FK_ed5600482a881eb8eb27cd48841"`);
        await queryRunner.query(`ALTER TABLE "news_genres__genre" DROP CONSTRAINT "FK_1dfde3c2726e400844f152643ed"`);
        await queryRunner.query(`ALTER TABLE "news_genres__genre" DROP CONSTRAINT "FK_caad336d2cec35d144169f70859"`);
        await queryRunner.query(`ALTER TABLE "news_songs__song" DROP CONSTRAINT "FK_3795f3f39c1167fb621df65593a"`);
        await queryRunner.query(`ALTER TABLE "news_songs__song" DROP CONSTRAINT "FK_a188056e828471264ccbc4d3783"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_2d90823b7e096e1fe2cc9b9d853"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP CONSTRAINT "FK_4db96de1624375bbbe21623ea1f"`);
        await queryRunner.query(`ALTER TABLE "Song" DROP CONSTRAINT "FK_ff0c94bb288735ee284c5b7a1b5"`);
        await queryRunner.query(`ALTER TABLE "Song" DROP CONSTRAINT "FK_d172260856811bfbe6e80753e33"`);
        await queryRunner.query(`ALTER TABLE "Song" DROP CONSTRAINT "FK_a2a85a3929d15572a71654bcb50"`);
        await queryRunner.query(`ALTER TABLE "News" DROP CONSTRAINT "FK_ccbfd7207639d508331b6dc2abd"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP CONSTRAINT "UQ_4db96de1624375bbbe21623ea1f"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "pictureId"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "views"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "staticPage"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "textShort"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Artist" DROP COLUMN "string"`);
        await queryRunner.query(`DROP INDEX "IDX_b31d863747c97d73c38d75a049"`);
        await queryRunner.query(`DROP INDEX "IDX_33c43a3f3159f833d23c49706f"`);
        await queryRunner.query(`DROP TABLE "artist_songs__song"`);
        await queryRunner.query(`DROP INDEX "IDX_4e7f004946d4b5c1a97d593a04"`);
        await queryRunner.query(`DROP INDEX "IDX_ed5600482a881eb8eb27cd4884"`);
        await queryRunner.query(`DROP TABLE "news_labels__label"`);
        await queryRunner.query(`DROP INDEX "IDX_1dfde3c2726e400844f152643e"`);
        await queryRunner.query(`DROP INDEX "IDX_caad336d2cec35d144169f7085"`);
        await queryRunner.query(`DROP TABLE "news_genres__genre"`);
        await queryRunner.query(`DROP INDEX "IDX_3795f3f39c1167fb621df65593"`);
        await queryRunner.query(`DROP INDEX "IDX_a188056e828471264ccbc4d378"`);
        await queryRunner.query(`DROP TABLE "news_songs__song"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TYPE "User_role_enum"`);
        await queryRunner.query(`DROP TABLE "Song"`);
        await queryRunner.query(`DROP TABLE "Artist"`);
        await queryRunner.query(`DROP TABLE "News"`);
        await queryRunner.query(`DROP TABLE "Image"`);
        await queryRunner.query(`DROP TABLE "Label"`);
        await queryRunner.query(`DROP TABLE "Genre"`);
    }

}
