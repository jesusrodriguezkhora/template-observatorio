"""Datos de prueba para desarrollo.

Uso (desde backend/, con la base de datos ya migrada):
    python -m app.seed
"""

import sys
from datetime import date
from decimal import Decimal

from sqlalchemy import func, select

from app.config import get_settings
from app.db import SessionLocal
from app.models import Area, ObjetivoProyecto, Proyecto, Subtema, Tema


def cents(euros: str) -> int:
    return int(Decimal(euros) * 100)


AREAS = [
    Area(
        id="A1",
        nombre="Área de Urbanismo",
        responsable="Jefatura del Servicio de Urbanismo",
    ),
    Area(
        id="A2",
        nombre="Área de Movilidad",
        responsable="Jefatura del Servicio de Movilidad",
    ),
    Area(
        id="A3",
        nombre="Área de Innovación",
        responsable="Dirección de Sistemas de Información",
    ),
]

TEMAS = [
    Tema(id="T1", nombre="Cultura", color_fondo="#FCE4EC", color_texto="#AD1457"),
    Tema(id="T2", nombre="Medioambiente", color_fondo="#E8F5E9", color_texto="#2E7D32"),
    Tema(id="T3", nombre="Clima", color_fondo="#E0F7FA", color_texto="#00838F"),
    Tema(id="T4", nombre="Movilidad", color_fondo="#FFF3E0", color_texto="#E65100"),
    Tema(id="T5", nombre="Social", color_fondo="#F3E5F5", color_texto="#6A1B9A"),
    Tema(id="T6", nombre="Digitalización", color_fondo="#E8EAF6", color_texto="#283593"),
    Tema(id="T7", nombre="Economía", color_fondo="#FFFDE7", color_texto="#827717"),
    Tema(id="T8", nombre="Educación", color_fondo="#FBE9E7", color_texto="#BF360C"),
]

SUBTEMAS = [
    Subtema(
        id="S1",
        tema_id="T5",
        nombre="Participación ciudadana",
        color_fondo="#6A3FB5",
        color_texto="#FFFFFF",
    ),
    Subtema(
        id="S2",
        tema_id="T7",
        nombre="Economía azul",
        color_fondo="#0D47A1",
        color_texto="#FFFFFF",
    ),
]


def objetivos(*descripciones: str) -> list[ObjetivoProyecto]:
    return [
        ObjetivoProyecto(id=f"OE{orden}", descripcion=texto, orden=orden)
        for orden, texto in enumerate(descripciones, start=1)
    ]


PROYECTOS = [
    Proyecto(
        id="P1",
        nombre="Rehabilitación del casco histórico",
        nombre_corto="Casco histórico",
        programa="Programa de Fondos Europeos 2021-2027",
        descripcion=(
            "Recuperación del espacio público y del patrimonio edificado del casco "
            "histórico, priorizando la movilidad peatonal y la conservación de "
            "fachadas protegidas."
        ),
        area_id="A1",
        porcentaje_cofinanciacion=60,
        presupuesto_solicitado=cents("19633507.15"),
        presupuesto_concedido=cents("14270696.01"),
        feder_concedido=cents("8562417.61"),
        presupuesto_adjudicado=cents("870000"),
        presupuesto_ejecutado=cents("337974.76"),
        presupuesto_declarado=cents("0"),
        pendiente_justificar=cents("14270696.01"),
        iva_financiable=True,
        fecha_inicio=date(2026, 1, 16),
        fecha_fin=date(2030, 12, 31),
        objetivos=objetivos(
            "Recuperar el espacio público del casco histórico para el peatón.",
            "Conservar y poner en valor el patrimonio edificado protegido.",
        ),
    ),
    Proyecto(
        id="P2",
        nombre="Plan de movilidad sostenible",
        programa="Programa de Fondos Europeos 2021-2027",
        descripcion=(
            "Conjunto de actuaciones para reducir el uso del vehículo privado "
            "mediante transporte público, carriles bici y aparcamientos disuasorios."
        ),
        area_id="A2",
        porcentaje_cofinanciacion=60,
        presupuesto_solicitado=cents("8500000"),
        presupuesto_concedido=cents("6120000.50"),
        feder_concedido=cents("3672000.30"),
        presupuesto_adjudicado=cents("2100000"),
        presupuesto_ejecutado=cents("1250000"),
        presupuesto_declarado=cents("450000"),
        pendiente_justificar=cents("5320000.50"),
        iva_financiable=False,
        fecha_inicio=date(2026, 3, 1),
        fecha_fin=date(2029, 6, 30),
        objetivos=objetivos(
            "Reducir el uso del vehículo privado en los desplazamientos diarios.",
            "Conectar los barrios periféricos con transporte público y carril bici.",
            "Facilitar la intermodalidad mediante aparcamientos disuasorios.",
        ),
    ),
    Proyecto(
        id="P3",
        nombre="Digitalización de servicios municipales",
        nombre_corto="Ciudad digital",
        programa="Programa de Fondos Europeos 2021-2027",
        descripcion="Pendiente de redactar.",
        area_id="A3",
        presupuesto_solicitado=cents("2400000"),
        iva_financiable=False,
        fecha_inicio=date(2027, 1, 1),
        fecha_fin=date(2029, 12, 31),
    ),
]


def main() -> int:
    if get_settings().environment == "production":
        print("No se cargan datos de prueba en producción.")
        return 1

    with SessionLocal() as session:
        if session.scalar(select(func.count()).select_from(Proyecto)):
            print("La base de datos ya tiene datos; no se carga nada.")
            return 1
        session.add_all([*AREAS, *TEMAS, *SUBTEMAS, *PROYECTOS])
        session.commit()

    print(
        f"Cargados: {len(AREAS)} áreas, {len(TEMAS)} temas, "
        f"{len(SUBTEMAS)} subtemas y {len(PROYECTOS)} proyectos."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())